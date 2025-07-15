'use client';

import { useState } from 'react';
import { storage, db, auth } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';
import { Shield, Award, ShoppingCart, Zap, Check } from 'lucide-react';
import { ROOM_OPTIONS } from '@/constants';
import { PRICING } from '@/constants/pricing';

const OrderForm = ({ image, frame, size, room }: OrderFormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		address: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!auth.currentUser) {
			await signInAnonymously(auth);
		}

		if (
			!image ||
			!formData.name ||
			!formData.phone ||
			!formData.email ||
			!formData.address
		) {
			alert('Please fill in all fields and upload an image.');
			return;
		}

		const phoneRegex = /^[\d\s()+-]+$/;
		if (!phoneRegex.test(formData.phone)) {
			alert('Please enter a valid phone number.');
			return;
		}

		let filePath = '';

		if (typeof image === 'string' && image.startsWith('data:image/')) {
			const response = await fetch(image); // convert base64 to blob
			const blob = await response.blob();
			// const fileName = `order_${Date.now()}.png`;
			filePath = `orders/order_${Date.now()}.png`;
			const storageRef = ref(storage, filePath);
			await uploadBytes(storageRef, blob);
		} else {
			alert('Please upload a valid image.');
			return;
		}

		const orderData = {
			...formData,
			frame,
			size,
			room,
			image: filePath,
			status: 'Pending',
			createdAt: new Date().toISOString(),
		};

		// console.log('📦 Order submitted:', orderData);

		try {
			await addDoc(collection(db, 'orders'), orderData);
			setSubmitted(true);
		} catch (error) {
			console.error('Error saving order:', error);
			alert('Failed to submit order. Try again.');
		}

		setTimeout(() => {
			setSubmitted(true);
			setLoading(false);
		}, 2000);
	};

	if (submitted) {
		return (
			<div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
				<div className='bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center'>
					<div className='w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4'>
						<Check className='w-10 h-10 text-green-600' />
					</div>
					<h3 className='text-2xl font-bold text-white mb-2'>
						Order Confirmed!
					</h3>
					<p className='text-green-100'>Your custom frame is being prepared</p>
				</div>

				<div className='p-6'>
					<div className='space-y-4'>
						<div className='flex items-center space-x-3'>
							<div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
								<Check className='w-5 h-5 text-green-600' />
							</div>
							<p className='text-gray-700'>Order received and confirmed</p>
						</div>
						<div className='flex items-center space-x-3'>
							<div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
								<span className='text-gray-400 font-bold'>2</span>
							</div>
							<p className='text-gray-500'>
								Processing and printing (2-3 business days)
							</p>
						</div>
						<div className='flex items-center space-x-3'>
							<div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
								<span className='text-gray-400 font-bold'>3</span>
							</div>
							<p className='text-gray-500'>
								Shipping and delivery (3-5 business days)
							</p>
						</div>
					</div>

					<div className='mt-6 p-4 bg-gray-50 rounded-2xl'>
						<p className='text-sm text-gray-600 mb-2'>We'll send updates to:</p>
						<p className='font-medium text-gray-800'>{formData.email}</p>
						<p className='font-medium text-gray-800'>{formData.phone}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
			<div className='bg-gradient-to-r from-teal-600 to-teal-700 p-6'>
				<h3 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
					<ShoppingCart className='w-6 h-6' />
					Complete Your Order
				</h3>
				<p className='text-indigo-100'>
					Fast, secure, and hassle-free checkout
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className='p-6'
			>
				<div className='space-y-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Full Name
						</label>
						<input
							type='text'
							value={formData.name}
							onChange={(e) => handleInputChange('name', e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-700 focus:border-teal-500 transition-colors'
							placeholder='Enter your full name'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Phone Number
						</label>
						<input
							type='text'
							name='phone'
							value={formData.phone}
							onChange={(e) => handleInputChange('phone', e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-700 focus:border-teal-500 transition-colors'
							placeholder='Enter your phone number'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Email Address
						</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
							className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-700 focus:border-teal-500 transition-colors'
							placeholder='Enter your email address'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Delivery Address
						</label>
						<textarea
							value={formData.address}
							onChange={(e) => handleInputChange('address', e.target.value)}
							rows={3}
							className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-700 focus:border-teal-500 transition-colors resize-none'
							placeholder='Enter your complete delivery address'
							required
						/>
					</div>

					<div className='bg-gray-50 p-4 rounded-2xl'>
						<h4 className='font-medium text-gray-800 mb-3'>Order Summary</h4>
						<div className='space-y-2 text-sm'>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Frame:</span>
								<span className='font-medium capitalize'>{frame}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Size:</span>
								<span className='font-medium'>{size}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Room:</span>
								<span className='font-medium'>
									{ROOM_OPTIONS.find((r) => r.value === room)?.name}
								</span>
							</div>
							<div className='border-t pt-2 mt-2'>
								<div className='flex justify-between items-center'>
									<span className='font-medium text-gray-800'>Total:</span>
									<span className='text-2xl font-bold text-teal-600'>
										₦{PRICING[size as keyof typeof PRICING]}
									</span>
								</div>
								<p className='text-xs text-gray-500 mt-1'>
									Free shipping included
								</p>
							</div>
						</div>
					</div>
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full mt-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-teal-700/90 hover:to-teal-800/70 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
				>
					{loading ? (
						<div className='flex items-center justify-center space-x-2'>
							<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
							<span>Processing Order...</span>
						</div>
					) : (
						<div className='flex items-center justify-center space-x-2'>
							<span>Place Order</span>
							<Zap className='w-5 h-5' />
						</div>
					)}
				</button>

				<div className='mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500'>
					<div className='flex items-center space-x-1'>
						<Shield className='w-4 h-4' />
						<span>Secure Payment</span>
					</div>
					<div className='flex items-center space-x-1'>
						<Award className='w-4 h-4' />
						<span>Money Back Guarantee</span>
					</div>
				</div>
			</form>
		</div>
	);
};

export default OrderForm;
