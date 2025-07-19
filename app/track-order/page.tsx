'use client';

import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import OrderStatusAnimation from '@/components/OrderStatusAnimations';
import { Map } from 'lucide-react';
import OrderCard from '@/components/OrderCard';
import Image from 'next/image';

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
		<div className='min-h-screen bg-teal-600 bg-gradient-to-br from-teal-600 via-teal-400 to-teal-800 flex items-center justify-center p-4'>
			{/* <div className='absolute inset-0 bg-white bg-opacity-20'></div> */}

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10 lg:w-2/3'>
				<div
					className={`bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto 
      ${!orderData && !notFound ? 'col-span-1 lg:col-span-2' : ''}`}
				>
					<div className='bg-teal-600 bg-gradient-to-r from-teal-600 to-teal-700 p-8 text-center'>
						<div className='w-16 h-16 p-3 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4'>
							<Image
								src='/logo.png'
								alt='Frame Lane Logo'
								width={80}
								height={80}
							/>
						</div>
						<h2 className='text-3xl font-bold text-white text-center'>
							Track Your Order
						</h2>
						<p className='text-indigo-100'>
							Frame.<span className='font-century-italic font-light'>lane</span>{' '}
							Management System
						</p>
					</div>

					<div className='p-8 space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Order ID
							</label>
							<input
								value={orderId}
								onChange={(e) => setOrderId(e.target.value)}
								placeholder='Enter your Order ID'
								className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-colors'
							/>
						</div>

						<button
							onClick={handleTrack}
							className='w-full bg-teal-600 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-xl font-medium hover:from-teal-700 hover:to-teal-800 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
						>
							{loading ? (
								<div className='flex items-center justify-center space-x-2'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
									<span>Checking...</span>
								</div>
							) : (
								<div className='flex items-center justify-center space-x-2'>
									<Map className='w-5 h-5' />
									<span>Track Order</span>
								</div>
							)}
						</button>
					</div>
				</div>

				<div>
					{notFound && (
						<p className='text-red-500 text-center'>No order found.</p>
					)}

					{orderData && (
						<>
							<OrderStatusAnimation status={orderData?.status || 'Pending'} />
							<div className='mt-2 p-4 rounded '>
								<OrderCard
									order={orderData}
									onStatusChange={() => {}}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
