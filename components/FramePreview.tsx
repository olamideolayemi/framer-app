import { FRAME_STYLES, SIZE_DIMENSIONS } from '@/constants';
import { Camera, Shield, Star, Truck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const FramePreview = ({ image, frame, room, size }: FramePreviewProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const backgroundImage = `/rooms/${room || 'living-room.jpg'}`;
	const frameStyle = FRAME_STYLES[frame];
	const frameSizeClass = SIZE_DIMENSIONS[size] || 'w-[140px] h-[200px]';

	useEffect(() => {
		if (image) {
			setIsLoading(true);
			setTimeout(() => setIsLoading(false), 500);
		}
	}, [image, frame, room, size]);

	return (
		<div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
			<div className='bg-gradient-to-r from-teal-600 to-teal-700 p-6'>
				<h3 className='text-2xl font-bold text-white mb-2'>Live Preview</h3>
				<p className='text-indigo-100'>
					See how your photo will look on the wall
				</p>
			</div>

			<div className='p-6'>
				<div className='relative'>
					<div
						className='w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-inner relative overflow-hidden'
						style={{
							backgroundImage: `url(${backgroundImage})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						{isLoading ? (
							<div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-80'>
								<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600'></div>
							</div>
						) : image ? (
							<div className='absolute inset-0 flex items-center justify-center'>
								{FRAME_STYLES[frame] === 'color' ? (
									<div
										className={`bg-white flex items-center justify-center shadow-2xl border-8 border-black ${SIZE_DIMENSIONS[size]}`}
										style={{
											transform:
												'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
										}}
									>
										<Image
											src={`${image}`}
											alt='Framed Upload'
											className='object-cover w-full h-full'
											width={300}
											height={300}
										/>
									</div>
								) : (
									<div
										className={`p-3 bg-white shadow-2xl ${SIZE_DIMENSIONS[size]}`}
										style={{
											backgroundImage: `url(${FRAME_STYLES[frame]})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											transform:
												'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
										}}
									>
										<div className='w-full h-full overflow-hidden'>
											<Image
												src={`${image}`}
												alt='Framed Upload'
												className='object-cover w-full h-full rounded-none'
												width={300}
												height={300}
											/>
										</div>
									</div>
								)}
							</div>
						) : (
							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='text-center text-gray-500'>
									<Camera className='w-16 h-16 mx-auto mb-4 opacity-50' />
									<p className='text-lg font-medium'>
										Upload an image to see preview
									</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{image && (
					<div className='mt-6 grid grid-cols-3 gap-4 text-center'>
						<div className='p-3 bg-gray-50 rounded-xl'>
							<Star className='w-6 h-6 text-yellow-500 mx-auto mb-2' />
							<p className='text-sm font-medium text-gray-700'>
								Premium Quality
							</p>
						</div>
						<div className='p-3 bg-gray-50 rounded-xl'>
							<Shield className='w-6 h-6 text-green-500 mx-auto mb-2' />
							<p className='text-sm font-medium text-gray-700'>UV Protected</p>
						</div>
						<div className='p-3 bg-gray-50 rounded-xl'>
							<Truck className='w-6 h-6 text-[#457b6e] mx-auto mb-2' />
							<p className='text-sm font-medium text-gray-700'>Fast Shipping</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FramePreview;
