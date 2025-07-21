'use client';

import { useEffect, useState } from 'react';
import { storage, db, auth } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { signInAnonymously, User } from 'firebase/auth';
import { Shield, Award, ShoppingCart, Zap, Check } from 'lucide-react';
import { ROOM_OPTIONS } from '@/constants';
import { PRICING } from '@/constants/pricing';
import { OrderFormProps } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const OrderForm = ({ image, frame, size, room }: OrderFormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		address: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
			if (user) {
				setFormData((prev) => ({
					...prev,
					email: user.email || '',
					name: user.displayName || '',
				}));
			}
		});
		return () => unsubscribe();
	}, []);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleCheckout = async (e: React.FormEvent) => {
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
			toast.error('Please fill in all required fields and upload an image.');
			return null;
		}

		const phoneRegex = /^[\d\s()+-]+$/;
		if (!phoneRegex.test(formData.phone)) {
			toast.error('Please enter a valid phone number.');
			return;
		}

		setLoading(true);

		try {
			let filePath = '';

			if (typeof image === 'string' && image.startsWith('data:image/')) {
				const response = await fetch(image);
				const blob = await response.blob();
				// const fileName = `order_${Date.now()}.png`;
				filePath = `orders/order_${Date.now()}.png`;
				const storageRef = ref(storage, filePath);
				await uploadBytes(storageRef, blob);
			} else {
				toast.error('Please upload a valid image.');
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

			// try {
			// 	await addDoc(collection(db, 'orders'), {
			// 		userId: currentUser?.uid || null,
			// 		...orderData,
			// 	});
			// 	toast.success(`Order sent successfully!`);
			// 	setSubmitted(true);
			// } catch (error) {
			// 	console.error('Error saving order:', error);
			// 	toast.error('Failed to submit order. Try again.');
			// }

			// setTimeout(() => {
			// 	setSubmitted(true);
			// 	setLoading(false);
			// }, 2000);

			localStorage.setItem('checkoutOrder', JSON.stringify(orderData));

			router.push('/checkout');
		} catch (error) {
			console.error('Checkout error:', error);
			toast.error('Something went wrong during checkout.');
		} finally {
			setLoading(false);
		}
	};

	// if (submitted) {
	// 	return (
	// 		<div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
	// 			<div className='bg-teal-600 not-first:bg-gradient-to-r from-teal-500 to-teal-700 p-6 text-center'>
	// 				<div className='w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4'>
	// 					<Check className='w-10 h-10 text-teal-600' />
	// 				</div>
	// 				<h3 className='text-2xl font-bold text-white mb-2'>
	// 					Order Confirmed!
	// 				</h3>
	// 				<p className='text-green-100'>Your custom frame is being prepared</p>
	// 			</div>

	// 			<div className='p-6'>
	// 				<div className='space-y-4'>
	// 					<div className='flex items-center space-x-3'>
	// 						<div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
	// 							<Check className='w-5 h-5 text-green-600' />
	// 						</div>
	// 						<p className='text-gray-700'>Order received and confirmed</p>
	// 					</div>
	// 					<div className='flex items-center space-x-3'>
	// 						<div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
	// 							<span className='text-gray-400 font-bold'>2</span>
	// 						</div>
	// 						<p className='text-gray-500'>
	// 							Processing and printing (2-3 business days)
	// 						</p>
	// 					</div>
	// 					<div className='flex items-center space-x-3'>
	// 						<div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
	// 							<span className='text-gray-400 font-bold'>3</span>
	// 						</div>
	// 						<p className='text-gray-500'>
	// 							Shipping and delivery (3-5 business days)
	// 						</p>
	// 					</div>
	// 				</div>

	// 				<div className='mt-6 p-4 bg-gray-50 rounded-2xl'>
	// 					<p className='text-sm text-gray-600 mb-2'>We'll send updates to:</p>
	// 					<p className='font-medium text-gray-800'>{formData.email}</p>
	// 					<p className='font-medium text-gray-800'>{formData.phone}</p>
	// 				</div>
	// 				<div className='mt-6 p-4 bg-gray-50 rounded-2xl'>
	// 					<p className='text-sm text-gray-600 mb-2'>
	// 						For further enquires or if you would like to speak to us
	// 					</p>
	// 					<p className='font-medium text-gray-800'>+2349031585326</p>
	// 					<p className='font-medium text-gray-800'>theframelane@gmail.com</p>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
			<div className='bg-teal-600 bg-gradient-to-r from-teal-600 to-teal-700 p-6'>
				<h3 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
					<ShoppingCart className='w-6 h-6' />
					Complete Your Order
				</h3>
				<p className='text-indigo-100'>
					Fast, secure, and hassle-free checkout
				</p>
			</div>

			<form
				// onSubmit={handleSubmit}
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
							readOnly={mounted && !!auth.currentUser?.displayName}
							onChange={(e) => handleInputChange('name', e.target.value)}
							className={clsx(
								'w-full px-4 py-3 border border-gray-300 rounded-xl transition-colors focus:ring-2 focus:ring-teal-700 focus:border-teal-500',
								{
									'bg-gray-200 cursor-not-allowed':
										mounted && !!auth.currentUser?.displayName,
								},
							)}
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
							readOnly={mounted && !!auth.currentUser?.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
							className={clsx(
								'w-full px-4 py-3 border border-gray-300 rounded-xl transition-colors focus:ring-2 focus:ring-teal-700 focus:border-teal-500',
								{
									'bg-gray-200 cursor-not-allowed':
										mounted && !!auth.currentUser?.email,
								},
							)}
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

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Extra Notes
						</label>
						<textarea
							value={formData.message || ''}
							onChange={(e) => handleInputChange('message', e.target.value)}
							rows={3}
							className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-700 focus:border-teal-500 transition-colors resize-none'
							placeholder='Any special instructions or notes for us?'
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
					type='button'
					onClick={handleCheckout}
					disabled={loading}
					className={clsx(
						'w-full mt-6 bg-teal-600 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg',
						{
							'hover:from-teal-700 hover:to-teal-800 transform hover:scale-105':
								!loading,
							'opacity-50 cursor-not-allowed': loading,
						},
					)}
				>
					<div className='flex items-center justify-center space-x-2'>
						{loading ? (
							<>
								<Zap className='animate-spin w-5 h-5' />
								<span>Processing...</span>
							</>
						) : (
							<>
								<span>Checkout</span>
								<ShoppingCart className='w-5 h-5' />
							</>
						)}
					</div>
				</button>

				<div className='mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500'>
					<div className='flex items-center space-x-1'>
						<Shield className='w-4 h-4' />
						<span>Secure Payment</span>
					</div>
					<div className='flex items-center space-x-1'>
						<Award className='w-4 h-4' />
						<span>Money Back Guarantee - Terms & Conditions Apply</span>
					</div>
				</div>
			</form>
		</div>
	);
};

export default OrderForm;
