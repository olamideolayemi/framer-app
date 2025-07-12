import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = async () => {
		await signOut(auth);
		router.push('/admin/login');
	};

	return (
		<button
			onClick={handleLogout}
			className='flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-5 w-5'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1'
				/>
			</svg>
			Logout
		</button>
	);
};

export default LogoutButton;
