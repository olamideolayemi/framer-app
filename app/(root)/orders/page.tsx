'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import OrderCard from '@/components/OrderCard';
import { Filter, Package, Search } from 'lucide-react';

export default function OrdersPage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const [orders, setOrders] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [checkingAuth, setCheckingAuth] = useState(true);

	const filteredOrders = orders.filter((order) => {
		const matchesSearch =
			(order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
			(order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ??
				false) ||
			(order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

		const matchesStatus =
			statusFilter === 'all' || order.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

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
		<div className='min-h-screen bg-gray-50'>
			<div className='max-w-7xl mx-auto p-6'>
				<h2 className='text-2xl font-bold mb-4'>Your Orders</h2>

				<div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
						<div className='flex items-center space-x-4'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
								<input
									type='text'
									placeholder='Search orders...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-700 focus:border-teal-600'
								/>
							</div>
							<div className='relative'>
								<Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className='pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-700 focus:border-teal-600'
								>
									<option value='all'>All Status</option>
									<option value='Pending'>Pending</option>
									<option value='In Progress'>In Progress</option>
									<option value='Shipped'>Shipped</option>
									<option value='Delivered'>Delivered</option>
									<option value='Cancelled'>Cancelled</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-bold text-gray-900'>
							Orders ({filteredOrders.length})
						</h2>
						<div className='flex items-center space-x-2 text-sm text-gray-500'>
							<span>
								Showing {filteredOrders.length} of {orders.length} orders
							</span>
						</div>
					</div>

					{loading ? (
						<LoadingScreen />
					) : (
						<>
							{filteredOrders.length === 0 ? (
								<div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center'>
									<Package className='w-16 h-16 text-gray-400 mx-auto mb-4' />
									<h3 className='text-lg font-medium text-gray-900 mb-2'>
										No orders found
									</h3>
									<p className='text-gray-500'>
										{searchTerm || statusFilter !== 'all'
											? 'Try adjusting your search or filter criteria'
											: 'Orders will appear here once customers start placing them'}
									</p>
								</div>
							) : (
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
									{filteredOrders.map((order) => (
										<OrderCard
											key={order.id}
											isAdmin
											order={order as any}
											onStatusChange={() => {}}
											onDelete={() => {}}
										/>
									))}
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
