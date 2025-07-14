import { Heart, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
	return (
		<div className='bg-white shadow-sm border-b'>
			<div className='max-w-7xl mx-auto px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-3'>
						<div className='w-10 h-10  rounded-xl flex items-center justify-center'>
							{/* <Sparkles className='w-6 h-6 text-white' /> */}
							<Image
								src='/logo.png'
								alt='Frame Lane Logo'
								width={80}
								height={35}
							/>
						</div>
					</div>
					<div>
						<h1 className='text-2xl font-bold text-gray-900'>Frame Lane</h1>
						<p className='text-sm text-gray-500'>Premium custom framing</p>
					</div>
				</div>
				{/* <div className='flex items-center space-x-4'>
					<div className='flex items-center space-x-1 text-sm text-gray-600'>
						<Star className='w-4 h-4 text-yellow-500' />
						<span className='font-medium'>4.9</span>
						<span>(2,847 reviews)</span>
					</div>
					<div className='flex items-center space-x-1 text-sm text-indigo-600'>
						<Heart className='w-4 h-4' />
						<span>Loved by 50k+ customers</span>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default Header;
