'use client';

import { db } from '@/lib/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function TestOrderButton() {
	const createTestOrder = async () => {
		await setDoc(doc(db, 'orders', 'test-order-id'), {
			name: 'Test User',
			email: 'olamideolayemi.git@gmail.com', // ✅ Use your actual email
			frame: 'Modern Black',
			size: 'A4',
			room: 'Living Room',
			createdAt: serverTimestamp(),
		});
		alert('Test order created!');
	};

	return (
		<button
			onClick={createTestOrder}
			className='bg-blue-600 text-white px-4 py-2 rounded'
		>
			Create Test Order
		</button>
	);
}
