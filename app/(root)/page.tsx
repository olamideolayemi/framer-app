'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import FrameSelector from '@/components/FrameSelector';
import FramePreview from '@/components/FramePreview';
import RoomSelector from '@/components/RoomSelector';
import SizeSelector from '@/components/SizeSelector';
import OrderForm from '@/components/OrderForm';
import Footer from '@/app/pages/Footer';
import Header from '@/app/pages/Header';
import Hero from '@/app/pages/Hero';

export default function Home() {
	const [uploadedImage, setUploadedImage] = useState<string | File>('');
	const [selectedFrame, setSelectedFrame] = useState('black');
	const [selectedRoom, setSelectedRoom] = useState('living-room.jpg');
	const [selectedSize, setSelectedSize] = useState('A4 (8x12 in)');

	return (
		<div className='min-h-screen bg-teal-50 bg-gradient-to-br from-teal-50 via-white to-green-50'>
			{/* Hero Section */}
			<div className='max-w-7xl mx-auto px-6 py-12'>
				<Hero />

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Left Panel - Configuration */}
					<div className='space-y-8'>
						<ImageUploader
							onUpload={setUploadedImage}
							uploadedImage={uploadedImage}
						/>
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

					{/* Right Panel - Preview & Order */}
					<div className='space-y-8'>
						<FramePreview
							image={uploadedImage}
							frame={selectedFrame}
							room={selectedRoom}
							size={selectedSize}
						/>
						<OrderForm
							image={uploadedImage}
							frame={selectedFrame}
							size={selectedSize}
							room={selectedRoom}
						/>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
