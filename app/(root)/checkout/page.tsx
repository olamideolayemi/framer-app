'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { PRICING } from '@/constants/pricing';
import { ROOM_OPTIONS } from '@/constants';
import { toast } from 'sonner';

const CheckoutPage = () => {
	const [order, setOrder] = useState<any>(null);
	const [promoCode, setPromoCode] = useState('');
	const [discount, setDiscount] = useState(0);
	const [user, setUser] = useState<any>(null);
	const [saveSuccess, setSaveSuccess] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const orderData = localStorage.getItem('checkoutOrder');
		if (orderData) {
			setOrder(JSON.parse(orderData));
		} else {
			toast.error('No order found. Please start again.');
			router.push('/');
		}

		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (!authUser) {
				router.push('/login?redirect=/checkout');
			} else {
				setUser(authUser);
			}
		});

		return () => unsubscribe();
	}, [router]);

	const applyDiscount = () => {
		if (promoCode.toLowerCase() === 'framedeal') {
			setDiscount(0.1); // 10% off
			toast.success('Promo code applied!');
		} else {
			toast.error('Invalid promo code');
		}
	};

	const saveForLater = async () => {
		try {
			if (!user?.uid) {
				toast.error('You must be logged in to save your order.');
				router.push('/login?redirect=/checkout');
				return;
			}

			if (!order) {
				toast.error('No order to save.');
				return;
			}

			const sanitizedOrder = {
				...order,
				status: 'draft',
				savedAt: Timestamp.now(),
				userId: user.uid,
			};

			await addDoc(collection(db, 'savedOrders'), sanitizedOrder); // 🔄 Switched from setDoc
			setSaveSuccess(true);
			toast.success('Order saved to drafts!');
		} catch (error) {
			console.error('Error saving order:', error);
			toast.error('Something went wrong while saving.');
		}
	};

	const totalPrice =
		order && PRICING[order.size as keyof typeof PRICING]
			? PRICING[order.size as keyof typeof PRICING] * (1 - discount)
			: 0;

	return (
		<div className='max-w-3xl mx-auto my-10 bg-white shadow-2xl rounded-3xl overflow-hidden'>
			<div className='bg-teal-700 p-6 text-white'>
				<h2 className='text-2xl font-bold'>Checkout</h2>
				<p className='text-teal-100'>
					Review your order, apply a discount, and proceed to payment
				</p>
			</div>

			{order && (
				<div className='p-6 space-y-6'>
					<div>
						<h4 className='text-lg font-medium text-gray-800 mb-2'>
							Order Summary
						</h4>
						<div className='space-y-1 text-sm text-gray-600'>
							<p>
								<strong>Frame:</strong> {order.frame}
							</p>
							<p>
								<strong>Size:</strong> {order.size}
							</p>
							<p>
								<strong>Room:</strong>{' '}
								{ROOM_OPTIONS.find((r) => r.value === order.room)?.name}
							</p>
							<p>
								<strong>Delivery:</strong> {order.address}
							</p>
							<p>
								<strong>Email:</strong> {order.email}
							</p>
						</div>
					</div>

					<div>
						<h4 className='text-lg font-medium text-gray-800 mb-2'>
							Promo Code
						</h4>
						<div className='flex gap-2'>
							<input
								type='text'
								value={promoCode}
								onChange={(e) => setPromoCode(e.target.value)}
								className='flex-1 px-4 py-2 border rounded-xl'
								placeholder='Enter discount code'
							/>
							<button
								onClick={applyDiscount}
								className='px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700'
							>
								Apply
							</button>
						</div>
					</div>

					<div className='p-4 bg-gray-50 rounded-2xl'>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Subtotal:</span>
							<span className='font-medium'>
								₦{PRICING[order.size as keyof typeof PRICING]}
							</span>
						</div>
						{discount > 0 && (
							<div className='flex justify-between'>
								<span className='text-green-600'>Discount:</span>
								<span className='font-medium text-green-600'>
									-₦
									{(
										PRICING[order.size as keyof typeof PRICING] * discount
									).toFixed(0)}
								</span>
							</div>
						)}
						<div className='border-t pt-3 mt-3 flex justify-between'>
							<span className='text-gray-800 font-bold'>Total:</span>
							<span className='text-2xl font-bold text-teal-600'>
								₦{totalPrice.toFixed(0)}
							</span>
						</div>
					</div>

					<div className='flex justify-between items-center gap-4'>
						<button
							onClick={saveForLater}
							className='w-1/2 py-3 border-2 border-teal-600 text-teal-700 rounded-2xl font-medium hover:bg-teal-50'
						>
							Save & Continue Later
						</button>
						{user ? (
							<button
								onClick={() => router.push('')}
								className='w-1/2 py-3 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all'
							>
								Proceed to Payment
							</button>
						) : (
							<button
								onClick={() => router.push('/login')}
								className='w-1/2 py-3 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all'
							>
								Login to Continue
							</button>
						)}
					</div>
					{saveSuccess && (
						<span className='inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2'>
							Saved to drafts successfully!
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default CheckoutPage;
