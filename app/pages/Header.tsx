'use client';

import { useAuth } from '@/lib/useAuth';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
	const { user, signOut } = useAuth();

	return (
		<header className='bg-white shadow-sm border-b'>
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
						<Link
							href='/login'
							className='text-teal-600 font-medium hover:underline'
						>
							Login
						</Link>
					) : (
						<button
							onClick={signOut}
							className='text-red-600 hover:underline'
						>
							Sign Out
						</button>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
