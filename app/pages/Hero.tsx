
const Hero = () => {
	return (
		<div className='text-center mb-12'>
			<h2 className='text-5xl font-bold text-gray-900 mb-4'>
				Transform Your Photos Into
				<span className='font-century-italic text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-500'>
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
					<div className='w-2 h-2 bg-teal-500 rounded-full'></div>
					<span>Hasty delivery across the country</span>
				</div>
				<div className='flex items-center space-x-2'>
					<div className='w-2 h-2 bg-teal-500 rounded-full'></div>
					<span>30-day money back guarantee</span>
				</div>
				<div className='flex items-center space-x-2'>
					<div className='w-2 h-2 bg-teal-500 rounded-full'></div>
					<span>Premium quality materials</span>
				</div>
			</div>
		</div>
	);
};

export default Hero;
