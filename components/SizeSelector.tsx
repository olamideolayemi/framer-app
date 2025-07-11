import { SIZE_OPTIONS } from "@/constants";

const SizeSelector = ({ selected, onSelect }: SizeSelectorProps) => {
	return (
		<div className='mb-6'>
			<label className='block mb-2 font-medium text-gray-700'>
				Choose Frame Size
			</label>
			<div className='flex flex-wrap gap-2'>
				{SIZE_OPTIONS.map((size) => (
					<button
						key={size}
						onClick={() => onSelect(size)}
						className={`px-3 py-2 rounded border text-sm transition ${
							selected === size
								? 'bg-gray-800 text-white border-gray-900'
								: 'bg-white text-gray-800 border-gray-400'
						}`}
					>
						{size}
					</button>
				))}
			</div>
		</div>
	);
};

export default SizeSelector;
