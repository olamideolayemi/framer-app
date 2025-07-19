'use client';

import { JSX } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Truck } from 'lucide-react';
import deliveredAnim from '@/public/animations/delivered.json';
import inTransitAnim from '@/public/animations/in_transit.json';
import processingAnim from '@/public/animations/processing.json';

type Status = 'processing' | 'transit' | 'delivered' | 'cancelled';

// 1. Map animation keys to animation JSONs
const animationMap: Record<Status, any> = {
	processing: processingAnim,
	transit: inTransitAnim,
	delivered: deliveredAnim,
	cancelled: deliveredAnim,
};

// 2. Map order status to animation key
const mapOrderStatusToAnimKey = (status: string): Status => {
	switch (status) {
		case 'Pending':
		case 'In Progress':
			return 'processing';
		case 'Shipped':
			return 'transit';
		case 'Delivered':
			return 'delivered';
		case 'Cancelled':
			return 'cancelled';
		default:
			return 'processing';
	}
};

const statusTextMap: Record<Status, string> = {
	processing: 'Your order is being processed.',
	transit: 'Your order is on its way to you.',
	delivered: 'Your order has been delivered!',
	cancelled: 'Your order has been cancelled!',
};

const statusIconMap: Record<Status, JSX.Element> = {
	processing: <Clock className='w-5 h-5 mr-2 text-yellow-600' />,
	transit: <Truck className='w-5 h-5 mr-2 text-blue-600' />,
	delivered: <CheckCircle className='w-5 h-5 mr-2 text-green-600' />,
	cancelled: <CheckCircle className='w-5 h-5 mr-2 text-red-600' />,
};

const statusColorMap: Record<Status, string> = {
	processing: 'bg-yellow-100 text-yellow-800',
	transit: 'bg-blue-100 text-blue-800',
	delivered: 'bg-green-100 text-green-800',
	cancelled: 'bg-green-100 text-green-red',
};

export default function OrderStatusAnimation({ status }: { status: string }) {
	const animKey = mapOrderStatusToAnimKey(status);
	const animationData = animationMap[animKey];
	const message = statusTextMap[animKey];
	const Icon = statusIconMap[animKey];
	const badgeColor = statusColorMap[animKey];

	return (
		<div className='w-full flex flex-col justify-center items-center p-2'>
			<Lottie
				animationData={animationData}
				loop
				className='w-48 '
			/>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className={`mt-4 px-4 py-2 rounded-full flex items-center text-sm font-medium ${badgeColor}`}
			>
				{Icon}
				<span>{message}</span>
			</motion.div>
		</div>
	);
}
