
const Hero = () => {
	return (
		<div className='text-center mb-12'>
			<h2 className='text-5xl font-bold text-gray-900 mb-4'>
				Transform Your Photos Into
				<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#3f9b85] to-[#34c4a2]'>
					{' '}
					Art
				</span>
			</h2>
			<p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
				Professional-grade custom framing with real-time preview. See exactly
				how your photo will look on your wall before you order.
			</p>
			<div className='flex items-center justify-center space-x-8 text-sm text-gray-500'>
				<div className='flex items-center space-x-2'>
					<div className='w-2 h-2 bg-green-500 rounded-full'></div>
					<span>Free shipping worldwide</span>
				</div>
				<div className='flex items-center space-x-2'>
					<div className='w-2 h-2 bg-green-500 rounded-full'></div>
					<span>30-day money back guarantee</span>
				</div>
				<div className='flex items-center space-x-2'>
					<div className='w-2 h-2 bg-green-500 rounded-full'></div>
					<span>Premium museum-quality materials</span>
				</div>
			</div>
		</div>
	);
};

export default Hero;
