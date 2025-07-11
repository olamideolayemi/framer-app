const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onUpload(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='mb-6'>
			<label className='block mb-2 font-medium text-gray-700'>
				Upload your photo
			</label>
			<input
				type='file'
				accept='image/*'
				onChange={handleImageChange}
				className='w-full border p-2 rounded bg-white'
			/>
		</div>
	);
};

export default ImageUploader;
