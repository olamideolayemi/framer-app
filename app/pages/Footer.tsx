import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
	return (
		<div className='bg-gray-900 text-white py-12 mt-20'>
			<div className='max-w-7xl mx-auto px-6 text-center'>
				<div className='flex items-center justify-center space-x-3 mb-6'>
					<div className='w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center'>
						{/* <Sparkles className='w-6 h-6 text-white' /> */}
						<Image
							src='/logo.png'
							alt='Frame Lane Logo'
							width={120}
							height={120}
						/>
					</div>
					<h3 className='text-2xl font-bold'>
						Frame.<span className='font-century-italic font-light text-teal-600'>lane</span>
					</h3>
				</div>
				<p className='text-gray-400 mb-8 max-w-2xl mx-auto'>
					Bringing your memories to life with premium custom framing. Every
					frame is carefully crafted with museum-quality materials and attention
					to detail.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
					<div className='text-center'>
						<div className='text-3xl font-bold text-teal-600 mb-2'>50k+</div>
						<p className='text-gray-400'>Happy Customers</p>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-teal-600 mb-2'>4.9★</div>
						<p className='text-gray-400'>Average Rating</p>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-teal-600 mb-2'>100k+</div>
						<p className='text-gray-400'>Photos Framed</p>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold text-teal-600 mb-2'>24/7</div>
						<p className='text-gray-400'>Customer Support</p>
					</div>
				</div>
				<div className='flex items-center justify-center space-x-8 text-sm text-gray-500'>
					<span>
						{new Date().getFullYear()} Frame Lane. All rights reserved.
					</span>
					<span>•</span>
					<span>Privacy Policy</span>
					<span>•</span>
					<span>Terms of Service</span>
					<span>•</span>
					<span>Contact Us</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
