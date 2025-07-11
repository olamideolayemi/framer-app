import { FRAME_OPTIONS } from "@/constants";

const FrameSelector = ({ selected, onSelect }: FrameSelectorProps) => {
	return (
		<div className='mb-6'>
			<label className='block mb-2 font-medium text-gray-700'>
				Choose frame type
			</label>
			<div className='flex space-x-4'>
				{FRAME_OPTIONS.map((frame) => (
					<button
						key={frame}
						onClick={() => onSelect(frame)}
						className={`px-4 py-2 rounded border transition ${
							selected === frame
								? 'border-black bg-black text-white'
								: 'border-gray-400 bg-white text-gray-800'
						}`}
					>
						{frame.charAt(0).toUpperCase() + frame.slice(1)}
					</button>
				))}
			</div>
		</div>
	);
};

export default FrameSelector;
