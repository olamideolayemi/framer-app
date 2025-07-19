'use client';

export default function LoadingScreen() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-700 to-teal-900 text-white'>
			<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50 mb-6'></div>
			<h2 className='text-2xl font-semibold'>Just a sec...</h2>
			<p className='text-sm text-white/80 mt-2'>
				We’re getting things ready for you
			</p>
		</div>
	);
}
