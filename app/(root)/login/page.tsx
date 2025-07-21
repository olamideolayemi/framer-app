'use client';

import { auth } from '@/lib/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { AlertCircle, Eye, EyeOff, LogIn } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginRegister() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get('redirect') || '/';

	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			if (isRegister) {
				await createUserWithEmailAndPassword(auth, email, password);
			} else {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password,
				);
				if (userCredential.user) {
					router.push(redirect);
				}
			}
			toast.success('Welcome back!');
		} catch (err: any) {
			setError(err.message);
		}
		setLoading(false);
	};

	return (
		<div className='min-h-screen bg-teal-600 bg-gradient-to-br from-teal-600 via-teal-400 to-teal-800 flex items-center justify-center p-4'>
			<div className='absolute inset-0 bg-black bg-opacity-20'></div>

			<div className='relative z-10 w-full max-w-md'>
				<div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
					<div className='bg-gradient-to-r from-teal-600 to-teal-700 p-8 text-center'>
						<div className='w-16 h-16 p-3 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4'>
							<Image
								src='/logo.png'
								alt='Frame Lane Logo'
								width={80}
								height={80}
							/>
						</div>
						<h2 className='text-2xl font-bold text-white mb-2'>
							{isRegister ? 'Register' : 'Login'}
						</h2>
						<p className='text-indigo-100'>
							Frame.<span className='font-century-italic font-light'>lane</span>
						</p>
					</div>

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
								className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-colors'
								type='email'
								placeholder='user@frameapp.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Password
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-colors pr-12'
									placeholder='Enter your password'
									onChange={(e) => setPassword(e.target.value)}
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
							onClick={handleAuth}
							disabled={loading}
							className='w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-xl font-medium hover:from-teal-700 hover:to-teal-800 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
						>
							{loading ? (
								<div className='flex items-center justify-center space-x-2'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
									<span>{isRegister ? 'Creating Account' : 'Signing In'}</span>
								</div>
							) : (
								<div className='flex items-center justify-center space-x-2'>
									<LogIn className='w-5 h-5' />
									<span>{isRegister ? 'Create Account' : 'Sign In'}</span>
								</div>
							)}
						</button>
					</div>

					<div className='my-4 text-center'>
						<p className=' text-sm opacity-75'>
							{isRegister
								? 'Already have an account?'
								: "Don't have an account?"}{' '}
							<button
								className='text-blue-600'
								onClick={() => setIsRegister(!isRegister)}
							>
								{isRegister ? 'Login' : 'Register'}
							</button>
						</p>
					</div>
				</div>
				<div className='mt-8 text-center'>
					<p className='text-white text-sm opacity-75'>
						Secure user access • Protected by enterprise-grade security
					</p>
				</div>
			</div>
		</div>
	);
}
