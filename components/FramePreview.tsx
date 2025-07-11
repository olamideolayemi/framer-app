import { FRAME_STYLES, SIZE_DIMENSIONS } from '@/constants';

const FramePreview = ({ image, frame, room, size }: FramePreviewProps) => {
	const backgroundImage = `/rooms/${room || 'living-room.jpg'}`;

	return (
		<div className='flex flex-col items-center'>
			<p className='mb-4 text-gray-700 font-medium'>Preview on Wall</p>

			<div
				className='w-full aspect-square max-w-sm bg-cover bg-center shadow-md relative'
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				{image ? (
					<div
						className={`absolute bg-white flex items-center justify-center ${
							FRAME_STYLES[frame]
						} ${SIZE_DIMENSIONS[size] || 'w-[140px] h-[200px]'}`}
					>
						<img
							src={image}
							alt='Framed Upload'
							className='object-contain max-h-full max-w-full'
						/>
					</div>
				) : (
					<p className='text-center text-gray-600 mt-24'>No image uploaded</p>
				)}
			</div>
		</div>
	);
};

export default FramePreview;
