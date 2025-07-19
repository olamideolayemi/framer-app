import { ImageUploaderProps } from '@/types';
import { Camera, Check, Upload } from 'lucide-react';
import { useRef, useState, DragEvent, ChangeEvent } from 'react';


const ImageUploader = ({ onUpload, uploadedImage }: ImageUploaderProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [dragActive, setDragActive] = useState(false);
	const [uploading, setUploading] = useState(false);

	const handleDrag = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const handleFile = (file: File) => {
		if (file && file.type.startsWith('image/')) {
			setUploading(true);
			const reader = new FileReader();

			reader.onload = (e: ProgressEvent<FileReader>) => {
				const result = e.target?.result;
				if (typeof result === 'string') {
					setTimeout(() => {
						onUpload(result);
						setUploading(false);
					}, 800);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	return (
		<div className='mb-8'>
			<h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
				<Upload className='w-5 h-5 text-teal-600' />
				Upload Your Photo
			</h3>

			<div
				className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
					dragActive
						? 'border-teal-600 bg-teal-50 scale-105'
						: uploadedImage
						? 'border-green-400 bg-green-50'
						: 'border-gray-300 hover:border-teal-300 hover:bg-teal-50'
				}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				{uploading ? (
					<div className='flex flex-col items-center space-y-4'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700'></div>
						<p className='text-teal-600 font-medium'>
							Processing your image...
						</p>
					</div>
				) : uploadedImage ? (
					<div className='flex flex-col items-center space-y-4'>
						<div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'>
							<Check className='w-10 h-10 text-green-600' />
						</div>
						<p className='text-green-600 font-medium'>
							Image uploaded successfully!
						</p>
						<button
							onClick={() => fileInputRef.current?.click()}
							className='text-teal-600 hover:text-teal-700 font-medium underline'
						>
							Upload different image
						</button>
					</div>
				) : (
					<div className='flex flex-col items-center space-y-4'>
						<div className='w-16 h-16 bg-gradient-to-br from-teal-700 to-teal-600 rounded-full flex items-center justify-center'>
							<Camera className='w-8 h-8 text-white' />
						</div>
						<div>
							<p className='text-lg font-medium text-gray-700 mb-2'>
								Drop your photo here or click to browse
							</p>
							<p className='text-sm text-gray-500'>
								Supports JPG, PNG, HEIC up to 10MB
							</p>
						</div>
						<button
							onClick={() => fileInputRef.current?.click()}
							className='px-6 py-3 bg-teal-600 bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-xl font-medium hover:ring-teal-800 hover:border-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg'
						>
							Choose File
						</button>
					</div>
				)}

				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					className='hidden'
				/>
			</div>
		</div>
	);
};

export default ImageUploader;
