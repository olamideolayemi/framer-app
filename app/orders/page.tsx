'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export default function OrdersPage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [orders, setOrders] = useState<any[]>([]);
	const [checkingAuth, setCheckingAuth] = useState(true);

	useEffect(() => {
		if (!loading) {
			if (!user) {
				setCheckingAuth(false);
				const redirectTo = encodeURIComponent('/orders');
				router.push(`/login?redirect=${redirectTo}`);
			} else {
				setCheckingAuth(false);
			}
		}
	}, [loading, user, router]);

	useEffect(() => {
		if (!loading && user) {
			const fetchOrders = async () => {
				const q = query(
					collection(db, 'orders'),
					where('userId', '==', user.uid),
				);
				const snapshot = await getDocs(q);
				const data = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setOrders(data);
			};

			fetchOrders().catch(console.error);
		}
	}, [user, loading]);

	if (!user || checkingAuth) {
		return <LoadingScreen />;
	}

	return (
		<div className='max-w-3xl mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-4'>Your Orders</h2>

			{loading ? (
				<p>Loading your orders...</p>
			) : orders.length === 0 ? (
				<p>No orders found.</p>
			) : (
				<ul className='space-y-4'>
					{orders.map((order) => (
						<li
							key={order.id}
							className='border p-4 rounded bg-white'
						>
							<p>
								<strong>Order ID:</strong> {order.id}
							</p>
							<p>
								<strong>Size:</strong> {order.size}
							</p>
							<p>
								<strong>Frame:</strong> {order.frame}
							</p>
							<p>
								<strong>Status:</strong> {order.status ?? 'Processing'}
							</p>
							<p>
								<strong>Date:</strong>{' '}
								{new Date(order.createdAt).toLocaleString()}
							</p>
							{order.imageUrl && (
								<img
									src={order.imageUrl}
									alt='Uploaded'
									className='mt-2 w-32 rounded shadow'
								/>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
