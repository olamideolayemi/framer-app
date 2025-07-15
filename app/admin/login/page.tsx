'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { AlertCircle, Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			await signInWithEmailAndPassword(auth, formData.email, formData.password);
			router.push('/admin'); // redirect to dashboard
		} catch (err) {
			setError('Login failed. Please check your credentials.');
			console.error('Login error:', err);
		}
		setLoading(false);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-[#3f9b85] to-[#1c4138] via-[#33cfbb] flex items-center justify-center p-4'>
			<div className='absolute inset-0 bg-black bg-opacity-20'></div>

			<div className='relative z-10 w-full max-w-md'>
				<div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
					{/* Header */}
					<div className='bg-gradient-to-r from-[#3f9b85] to-[#457b6e] p-8 text-center'>
						<div className='w-16 h-16 p-3 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4'>
							{/* <Shield className='w-8 h-8 text-#457b6e' /> */}
							<Image
								src='/logo.png'
								alt='Frame Lane Logo'
								width={80}
								height={80}
							/>
						</div>
						<h1 className='text-2xl font-bold text-white mb-2'>Admin Portal</h1>
						<p className='text-indigo-100'>Frame Lane Management System</p>
					</div>

					{/* Form */}
					<div className='p-8 space-y-6'>
						{error && (
							<div className='bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3'>
								<AlertCircle className='w-5 h-5 text-red-600' />
								<p className='text-red-600 text-sm'>{error}</p>
							</div>
						)}

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Email Address
							</label>
							<input
								type='email'
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34c4a2] focus:border-[#34c4a2] transition-colors'
								placeholder='admin@frameapp.com'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Password
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#34c4a2] focus:border-[#34c4a2]transition-colors pr-12'
									placeholder='Enter your password'
									required
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
								>
									{showPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>
						</div>

						<button
							type='button'
							onClick={handleLogin}
							disabled={loading}
							className='w-full bg-gradient-to-r from-[#3f9b85] to-[#457b6e] text-white py-3 rounded-xl font-medium hover:from-[#2f554c] hover:to-[#2f554c] transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
						>
							{loading ? (
								<div className='flex items-center justify-center space-x-2'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
									<span>Signing in...</span>
								</div>
							) : (
								<div className='flex items-center justify-center space-x-2'>
									<LogIn className='w-5 h-5' />
									<span>Sign In</span>
								</div>
							)}
						</button>
					</div>
				</div>

				<div className='mt-8 text-center'>
					<p className='text-white text-sm opacity-75'>
						Secure admin access • Protected by enterprise-grade security
					</p>
				</div>
			</div>
		</div>
	);
}
