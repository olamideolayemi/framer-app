'use client';

import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TrackOrder() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		setLoading(true);
		const snapshot = await getDocs(collection(db, 'orders'));
		const allOrders = snapshot.docs.map((doc) => doc.data());

		const filtered = allOrders.filter(
			(order) =>
				order.contact.includes(query) ||
				order.name.toLowerCase().includes(query.toLowerCase()),
		);

		setResults(filtered);
		setLoading(false);
	};

	return (
		<div className='p-6 max-w-xl mx-auto'>
			<h1 className='text-xl font-bold mb-4'>📦 Track Your Order</h1>
			<input
				type='text'
				placeholder='Enter your name or phone number'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className='w-full border p-2 rounded mb-2'
			/>
			<button
				onClick={handleSearch}
				className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
			>
				Search
			</button>

			{loading && <p className='mt-4'>Searching...</p>}

			{results.length > 0 && (
				<div className='mt-4 space-y-4'>
					{results.map((order, i) => (
						<div
							key={i}
							className='border p-4 rounded shadow'
						>
							<p>
								<strong>Name:</strong> {order.name}
							</p>
							<p>
								<strong>Phone:</strong> {order.contact}
							</p>
							<p>
								<strong>Status:</strong> {order.status}
							</p>
							<p className='text-xs text-gray-500'>
								Placed on: {new Date(order.createdAt).toLocaleDateString()}
							</p>
						</div>
					))}
				</div>
			)}

			{!loading && results.length === 0 && query && (
				<p className='mt-4 text-gray-500'>No order found.</p>
			)}
		</div>
	);
}
