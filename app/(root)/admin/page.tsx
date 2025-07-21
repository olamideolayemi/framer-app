'use client';

import { auth, db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	setDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import ExportButton from '@/components/ExportButton';
import {
	Activity,
	Box,
	Clock,
	Filter,
	Package,
	Search,
	ShoppingCart,
	Truck,
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import OrderCard from '@/components/OrderCard';
import Loading from '../../loading';
import { toast } from 'sonner';
import DeleteModal from '@/components/modals/DeleteModal';

type Order = {
	id: string;
	name: string;
	email: string;
	contact: string;
	phone: string;
	address: string;
	frame: string;
	size: string;
	room: string;
	status: string;
	createdAt?: { seconds: number; nanoseconds?: number } | number | null;
	image?: string | File;
};

export default function AdminDashboard() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	// const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [denied, setDenied] = useState(false);
	// const [adminEmail, setAdminEmail] = useState<string | null>(null);
	const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
	const [deleting, setDeleting] = useState(false);
	const router = useRouter();

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

	const stats = {
		totalOrders: orders.length,
		pending: orders.filter((o) => o.status === 'Pending').length,
		inProgress: orders.filter((o) => o.status === 'In Progress').length,
		shipped: orders.filter((o) => o.status === 'Shipped').length,
		delivered: orders.filter((o) => o.status === 'Delivered').length,
		// totalRevenue: orders.reduce((sum, order) => sum + order.value, 0),
	};

	const handleStatusChange = async (
		orderId: string | undefined,
		newStatus: string,
	) => {
		if (!orderId) return;

		// Update Firestore
		try {
			const orderRef = doc(db, 'orders', orderId);
			await updateDoc(orderRef, { status: newStatus });

			setOrders((prev) =>
				prev.map((order) =>
					order.id === orderId ? { ...order, status: newStatus } : order,
				),
			);
		} catch (error) {
			console.error('Failed to update order status:', error);
		}
	};

	const handleDelete = async () => {
		if (!deleteTarget?.id) return;

		setDeleting(true);
		try {
			await deleteDoc(doc(db, 'orders', deleteTarget.id));
			setOrders((prev) => prev.filter((order) => order.id !== deleteTarget.id));
			toast.success(`Order ${deleteTarget.id} deleted`);
			setDeleteTarget(null);
		} catch (err) {
			console.error('Delete failed:', err);
			toast.error('Failed to delete order. Please try again.');
		} finally {
			setDeleting(false);
		}
	};

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

			// setAdminEmail(user.email);

			// Check Firestore `admins` collection
			const adminRef = doc(db, 'admins', user.email || '');

			try {
				const adminSnap = await getDoc(adminRef);
				if (!adminSnap.exists()) {
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
			} catch (error) {
				console.error('Admin check failed:', error);
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

	const deniedAcess = () => {
		router.push('/admin/login');
	};

	if (denied) {
		return (
			<div className='flex flex-col items-center p-6 text-red-600 font-semibold'>
				❌ Access Denied – You are not authorized to view this dashboard.
				<button
					onClick={deniedAcess}
					className='px-4 py-2 mt-8 border text-gray-900 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
				>Back to login</button>
			</div>
		);
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='max-w-7xl mx-auto px-6 py-8'>
				{/* Stats Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
					<StatCard
						title='Total Orders'
						value={stats.totalOrders}
						icon={ShoppingCart}
						change='+12%'
						trend='up'
					/>
					<StatCard
						title='Pending'
						value={stats.pending}
						icon={Clock}
						change='+3'
						trend='up'
					/>
					<StatCard
						title='In Progress'
						value={stats.inProgress}
						icon={Activity}
						change='-2'
						trend='down'
					/>
					<StatCard
						title='Shipped'
						value={stats.shipped}
						icon={Truck}
						change='+8'
						trend='up'
					/>
					<StatCard
						title='Delivered'
						value={stats.delivered}
						icon={Box}
						change='+8'
						trend='up'
					/>
					{/* <StatCard
            title="Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            change="+15%"
            trend="up"
          /> */}
				</div>

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
						<ExportButton />
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
									onStatusChange={handleStatusChange}
									onDelete={() => setDeleteTarget(order)}
								/>
							))}
						</div>
					)}
				</div>

				{filteredOrders.length > 0 && (
					<div className='flex items-center justify-center mt-8'>
						<div className='flex items-center space-x-2'>
							<button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
								Previous
							</button>
							<span className='px-4 py-2 bg-teal-700 text-white rounded-lg'>
								1
							</span>
							<button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
								Next
							</button>
						</div>
					</div>
				)}
			</div>
			<DeleteModal
				deleteTarget={deleteTarget}
				deleting={deleting}
				onCancel={() => setDeleteTarget(null)}
				onConfirm={handleDelete}
			/>
		</div>
	);
}
