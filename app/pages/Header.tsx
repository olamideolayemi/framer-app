'use client';

import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/lib/useAuth';
import { Bell, Heart, LogIn, LogOut, Settings, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
	const { user, signOut } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const handleLogin = () => {
		router.push(`/login`);
	};

	const isAdminPath = pathname?.startsWith('/admin');

	return (
		<header className='bg-white shadow-sm border-b'>
			{isAdminPath ? (
				<div className='bg-white shadow-sm border-b'>
					<div className='max-w-7xl mx-auto px-6 py-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<div className='w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center'>
									{/* <Sparkles className='w-6 h-6 text-white' /> */}
									<Image
										src='/logo.png'
										alt='frame lane logo'
										width={80}
										height={80}
										// className='w-6 h-6'
									/>
								</div>
								<div>
									<h1 className='text-2xl font-bold text-gray-900'>
										Frame.
										<span className='font-light font-century-italic text-teal-700'>
											lane
										</span>{' '}
										Admin
									</h1>
									<p className='text-sm text-gray-500'>
										Order Management Dashboard
									</p>
								</div>
							</div>
							<div className='flex items-center space-x-4'>
								<button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
									<Bell className='w-5 h-5 text-gray-600' />
								</button>
								<button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
									<Settings className='w-5 h-5 text-gray-600' />
								</button>
								<LogoutButton />
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
					{/* Logo + Brand */}
					<Link
						href='/'
						className='flex items-center space-x-3'
					>
						<Image
							src='/logo.png'
							alt='Frame Lane Logo'
							width={40}
							height={40}
							className='rounded-lg'
						/>
						<div>
							<h1 className='text-xl font-bold text-gray-900'>
								Frame.
								<span className='font-century-italic font-light text-teal-600'>
									lane
								</span>
							</h1>
							<p className='text-xs text-gray-500'>Premium custom framing</p>
						</div>
					</Link>

					{/* Optional stats */}
					{/* 
				<div className='hidden md:flex items-center space-x-6 text-sm text-gray-600'>
					<div className='flex items-center space-x-1'>
						<Star className='w-4 h-4 text-yellow-500' />
						<span className='font-medium'>4.9</span>
						<span>(2,847 reviews)</span>
					</div>
					<div className='flex items-center space-x-1 text-indigo-600'>
						<Heart className='w-4 h-4' />
						<span>Loved by 50k+ customers</span>
					</div>
				</div>
				*/}

					{/* Nav / Auth Links */}
					<nav className='flex items-center space-x-4 text-sm'>
						{user && (
							<Link
								href='/orders'
								className='text-gray-700 hover:text-teal-600 transition'
							>
								Orders
							</Link>
						)}
						{!user ? (
							<button
								onClick={handleLogin}
								className='flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer'
							>
								<LogIn className='w-4 h-4' />
								<span>Login</span>
							</button>
						) : (
							<button
								onClick={signOut}
								className='flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer'
							>
								<LogOut className='w-4 h-4' />
								<span>Logout</span>
							</button>
						)}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;
