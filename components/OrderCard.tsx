import { OrderCardProps, OrderStatus } from '@/types';
import {
	Activity,
	Calendar,
	CheckCircle,
	Clock,
	Image as LucideImage,
	Mail,
	MapPin,
	MoreHorizontal,
	Package,
	Phone,
	Truck,
	XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const OrderCard = ({ order, onStatusChange, isAdmin }: OrderCardProps) => {
	const [showDetails, setShowDetails] = useState(false);

	const statusConfig = {
		Pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
		'In Progress': { color: 'bg-blue-100 text-blue-800', icon: Activity },
		Shipped: { color: 'bg-green-100 text-green-800', icon: Truck },
		Delivered: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
		Cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
	};

	const StatusIcon = statusConfig[order.status as OrderStatus]?.icon || Clock;

	return (
		<div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
			<div className='p-6'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center space-x-3'>
						<div className='w-10 h-10 bg-teal-600 bg-gradient-to-br from-teal-700 to-teal-600 rounded-xl flex items-center justify-center'>
							<Package className='w-5 h-5 text-white' />
						</div>
						<div>
							<h3 className='font-bold text-gray-900'>{order.id}</h3>
							<p className='text-sm text-gray-500'>{order.name}</p>
						</div>
					</div>
					<div className='flex items-center space-x-2'>
						<span
							className={`px-3 py-1 rounded-full text-xs font-medium ${
								statusConfig[order.status as OrderStatus]?.color
							}`}
						>
							<StatusIcon className='w-3 h-3 inline mr-1' />
							{order.status}
						</span>
						<button
							onClick={() => setShowDetails(!showDetails)}
							className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
						>
							<MoreHorizontal className='w-4 h-4 text-gray-500' />
						</button>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-4 mb-4'>
					<div>
						<p className='text-sm text-gray-500'>Frame & Size</p>
						<p className='font-medium capitalize'>
							{order.frame} • {order.size}
						</p>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-2 text-sm text-gray-500'>
						<Calendar className='w-4 h-4' />
						<span>
							{order.createdAt
								? new Date(
										typeof order.createdAt === 'object' &&
										'seconds' in order.createdAt
											? order.createdAt.seconds * 1000
											: order.createdAt,
								  ).toLocaleString() // <-- changed from toLocaleDateString()
								: 'N/A'}
						</span>
					</div>
					{isAdmin && (
						<select
							value={order.status}
							onChange={(e) => {
								if (order?.id && onStatusChange) {
									onStatusChange(order.id, e.target.value);
								}
							}}
							className='px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-700 focus:border-teal-600'
						>
							<option value='Pending'>Pending</option>
							<option value='In Progress'>In Progress</option>
							<option value='Shipped'>Shipped</option>
							<option value='Delivered'>Delivered</option>
							<option value='Cancelled'>Cancelled</option>
						</select>
					)}
				</div>

				{showDetails && (
					<div className='mt-4 pt-4 border-t border-gray-100'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-3'>
								<div className='flex items-center space-x-2'>
									<Mail className='w-4 h-4 text-gray-500' />
									<span className='text-sm text-gray-600'>{order.email}</span>
								</div>
								<div className='flex items-center space-x-2'>
									<Phone className='w-4 h-4 text-gray-500' />
									<span className='text-sm text-gray-600'>{order.phone}</span>
								</div>
								<div className='flex items-start space-x-2'>
									<MapPin className='w-4 h-4 text-gray-500 mt-1' />
									<span className='text-sm text-gray-600'>{order.address}</span>
								</div>
							</div>
							<div className='flex items-center justify-center'>
								{order.image ? (
									<Image
										src={`${order?.image}`}
										alt='Order preview'
										width={96}
										height={96}
										className='object-cover rounded-lg border border-gray-200'
									/>
								) : (
									<div className='w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center'>
										<LucideImage className='w-8 h-8 text-gray-400' />
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderCard;
