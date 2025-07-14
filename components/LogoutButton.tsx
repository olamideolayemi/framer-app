import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
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
			className='flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
		>
			<LogOut className='w-4 h-4' />
			<span>Logout</span>
		</button>
	);
};

export default LogoutButton;
