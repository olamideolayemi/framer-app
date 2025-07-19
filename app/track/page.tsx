'use client';

import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TrackOrderPage() {
	const [orderId, setOrderId] = useState('');
	const [orderData, setOrderData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);

	const handleTrack = async () => {
		if (!orderId.trim()) return;
		setLoading(true);
		setNotFound(false);
		setOrderData(null);

		try {
			const docRef = doc(db, 'orders', orderId.trim());
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setOrderData(docSnap.data());
			} else {
				setNotFound(true);
			}
		} catch (error) {
			console.error('Error fetching order:', error);
			setNotFound(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-4'>Track Your Order</h2>

			<input
				type='text'
				value={orderId}
				onChange={(e) => setOrderId(e.target.value)}
				placeholder='Enter your order ID'
				className='w-full border px-3 py-2 mb-3 rounded'
			/>
			<button
				onClick={handleTrack}
				className='w-full bg-black text-white py-2 rounded'
				disabled={loading}
			>
				{loading ? 'Checking...' : 'Track Order'}
			</button>

			{notFound && (
				<p className='mt-4 text-red-600 text-sm'>
					Order not found. Check your ID and try again.
				</p>
			)}

			{orderData && (
				<div className='mt-6 border p-4 rounded bg-gray-50'>
					<p>
						<strong>Name:</strong> {orderData.full_name}
					</p>
					<p>
						<strong>Frame Size:</strong> {orderData.size}
					</p>
					<p>
						<strong>Frame Type:</strong> {orderData.frame}
					</p>
					<p>
						<strong>Status:</strong> {orderData.status ?? 'Processing'}
					</p>
					{orderData.createdAt && (
						<p>
							<strong>Order Date:</strong>{' '}
							{new Date(
								typeof orderData.createdAt === 'object' &&
								orderData.createdAt.seconds
									? orderData.createdAt.seconds * 1000
									: orderData.createdAt,
							).toLocaleString()}
						</p>
					)}
				</div>
			)}
			{!orderData && !notFound && !loading && (
				<p className='mt-4 text-gray-500'>
					Enter your order ID to see details.
				</p>
			)}
		</div>
	);
}
