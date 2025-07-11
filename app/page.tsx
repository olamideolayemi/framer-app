'use client';

import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import FrameSelector from '../components/FrameSelector';
import FramePreview from '../components/FramePreview';
import RoomSelector from '../components/RoomSelector';
import SizeSelector from '../components/SizeSelector';
import OrderForm from '../components/OrderForm';

export default function Home() {
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [selectedFrame, setSelectedFrame] = useState<string>('black');
	const [selectedRoom, setSelectedRoom] = useState<string>('living-room.jpg');
	const [selectedSize, setSelectedSize] = useState<string>('A4 (8x12 in)');

	return (
		<div className='min-h-screen bg-gray-100 p-6'>
			<h1 className='text-3xl font-bold mb-6 text-center'>
				🖼️ Frame Your Photo
			</h1>

			<div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div>
					<ImageUploader onUpload={setUploadedImage} />
					<FrameSelector
						selected={selectedFrame}
						onSelect={setSelectedFrame}
					/>
					<RoomSelector
						selected={selectedRoom}
						onSelect={setSelectedRoom}
					/>
					<SizeSelector
						selected={selectedSize}
						onSelect={setSelectedSize}
					/>
				</div>

				<div>
					<FramePreview
						image={uploadedImage}
						frame={selectedFrame}
						room={selectedRoom}
						size={selectedSize}
					/>

					<div className='mt-8'>
						<OrderForm
							image={uploadedImage ?? ''}
							frame={selectedFrame}
							size={selectedSize}
							room={selectedRoom}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
