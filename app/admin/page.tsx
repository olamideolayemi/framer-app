'use client';

import { auth, db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import ExportButton from '@/components/ExportButton';

export default function AdminDashboard() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [denied, setDenied] = useState(false);
	const [adminEmail, setAdminEmail] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchOrders = async () => {
			const snapshot = await getDocs(collection(db, 'orders'));
			const data = snapshot.docs.map((doc) => doc.data() as Order);
			setOrders(data);
		};

		fetchOrders();
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				router.push('/admin/login');
				return;
			}

			setAdminEmail(user.email);

			// Check Firestore `admins` collection
			const adminRef = doc(db, 'admins', user.email || '');
			const adminSnap = await getDoc(adminRef);

			if (!adminSnap.exists()) {
				// Log unauthorized access
				await setDoc(
					doc(collection(db, 'unauthorized_access')),
					{
						email: user.email,
						attemptedAt: serverTimestamp(),
						userAgent: navigator.userAgent,
					},
					{ merge: true },
				);

				setDenied(true);
				return;
			}

			// Load orders
			const snapshot = await getDocs(collection(db, 'orders'));
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Order[];
			setOrders(data);
			setLoading(false);
		});

		return () => unsubscribe();
	}, [router]);

	const handleLogout = async () => {
		await signOut(auth);
		router.push('/admin/login');
	};

	if (denied) {
		return (
			<div className='p-6 text-red-600 font-semibold'>
				❌ Access Denied – You are not authorized to view this dashboard.
			</div>
		);
	}

	if (loading) {
		return <p className='p-6 text-gray-600'>Loading admin dashboard...</p>;
	}

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>📦 Orders Dashboard</h1>
			<ExportButton />

			<div className='space-y-6'>
				{orders.length === 0 ? (
					<p>No orders yet.</p>
				) : (
					orders.map((order, i) => (
						<div
							key={i}
							className='bg-white p-4 rounded shadow border'
						>
							<p>
								<strong>Name:</strong> {order.name}
							</p>
							<p>
								<strong>Contact:</strong> {order.contact}
							</p>
							<p>
								<strong>Address:</strong> {order.address}
							</p>
							<p>
								<strong>Frame:</strong> {order.frame}
							</p>
							<p>
								<strong>Size:</strong> {order.size}
							</p>
							<p>
								<strong>Room:</strong> {order.room}
							</p>
							<p>
								<strong>Status:</strong> {order.status}
							</p>
							<select
								value={order.status}
								onChange={async (e) => {
									const newStatus = e.target.value;
									const orderRef = doc(db, 'orders', order.id!);
									await updateDoc(orderRef, { status: newStatus });

									// Update local state (optional)
									setOrders((prev) =>
										prev.map((o, idx) =>
											idx === i ? { ...o, status: newStatus } : o,
										),
									);
								}}
								className='mt-1 border rounded p-1'
							>
								<option value='Pending'>Pending</option>
								<option value='In Progress'>In Progress</option>
								<option value='Shipped'>Shipped</option>
							</select>
							<img
								src={order.image}
								alt='Uploaded'
								className='mt-4 w-48 border'
							/>
							<p className='text-xs text-gray-500 mt-2'>
								Created: {new Date(order.createdAt).toLocaleString()}
							</p>
						</div>
					))
				)}
			</div>
		</div>
	);
}
