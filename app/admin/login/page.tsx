'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push('/admin'); // redirect to dashboard
		} catch (err) {
			setError('Login failed. Please check your credentials.');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
			<form
				onSubmit={handleLogin}
				className='bg-white text-black p-6 rounded shadow max-w-sm w-full space-y-4'
			>
				<h1 className='text-2xl font-bold text-center'>Admin Login</h1>

				{error && <p className='text-red-500 text-sm'>{error}</p>}

				<input
					type='email'
					placeholder='Admin Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='w-full border p-2 rounded'
					required
				/>

				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full border p-2 rounded'
					required
				/>

				<button
					type='submit'
					className='w-full bg-black text-white py-2 rounded hover:bg-gray-900'
				>
					Login
				</button>
			</form>
		</div>
	);
}
