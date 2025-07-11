'use client';

import { useState } from 'react';
import { storage, db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const OrderForm = ({ image, frame, size, room }: OrderFormProps) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!image || !name || !phone || !email || !address) {
			alert('Please fill in all fields and upload an image.');
			return;
		}

		const imageFile = typeof image === 'string' ? null : image; // check if File
		let imageUrl = '';

		if (imageFile) {
			const storageRef = ref(storage, `orders/${Date.now()}_${imageFile.name}`);
			const snapshot = await uploadBytes(storageRef, imageFile);
			imageUrl = await getDownloadURL(snapshot.ref);
		}

		const orderData = {
			name,
			phone,
			email,
			address,
			frame,
			size,
			room,
			image: imageUrl,
			status: 'Pending',
			createdAt: new Date().toISOString(),
		};

		try {
			await addDoc(collection(db, 'orders'), orderData);
			setSubmitted(true);
		} catch (error) {
			console.error('Error saving order:', error);
			alert('Failed to submit order. Try again.');
		}
	};

	if (submitted) {
		return (
			<div className='p-4 bg-green-100 text-green-700 rounded'>
				🎉 Order submitted successfully! We'll reach out shortly.
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4 bg-white text-black p-4 rounded shadow'
		>
			<h2 className='text-xl font-bold text-gray-800 mb-2'>
				📝 Complete Your Order
			</h2>

			<input
				type='text'
				placeholder='Full Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='w-full border p-2 rounded'
				required
			/>

			<input
				type='text'
				placeholder='Phone or Email'
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				className='w-full border p-2 rounded'
				required
			/>

			<input
				type='email'
				placeholder='Email Address'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<textarea
				placeholder='Delivery Address'
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				className='w-full border p-2 rounded'
				required
			/>

			<button
				type='submit'
				className='w-full bg-black text-white py-2 rounded hover:bg-gray-900'
			>
				Submit Order
			</button>
		</form>
	);
};

export default OrderForm;
