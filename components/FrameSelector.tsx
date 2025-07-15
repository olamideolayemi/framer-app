import { FRAME_OPTIONS } from '@/constants';
import { Check, Sparkles } from 'lucide-react';
import Image from 'next/image';

const FrameSelector = ({ selected, onSelect }: FrameSelectorProps) => {
	const frameColors = {
		black: 'bg-black',
		white: 'bg-white border-2 border-gray-200',
		wood: 'bg-gradient-to-br from-amber-600 to-amber-800',
		gold: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
		silver: 'bg-gradient-to-br from-gray-400 to-gray-600',
	};

	return (
		<div className='mb-8'>
			<h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
				<Sparkles className='w-5 h-5 text-teal-600' />
				Frame Style
			</h3>

			<div className='grid grid-cols-5 gap-4'>
				{FRAME_OPTIONS.map((frame) => (
					<button
						key={frame.label}
						onClick={() => onSelect(frame.label)}
						className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
							selected === frame.label
								? 'border-teal-600 bg-indigo-50 shadow-lg'
								: 'border-gray-200 hover:border-indigo-300'
						}`}
					>
						<div className='flex flex-col items-center space-y-2'>
							{frame.image ? (
								<div className='w-12 h-12 rounded-lg overflow-hidden shadow-md'>
									<Image
										src={frame.image}
										alt={frame.label}
										width={48}
										height={48}
										className='object-cover w-full h-full'
									/>
								</div>
							) : (
								<div
									className={`w-12 h-12 rounded-lg ${frame.colorClass} shadow-md`}
								></div>
							)}
							<span className='text-sm font-medium capitalize'>
								{frame.label}
							</span>
						</div>
						{selected === frame.label && (
							<div className='absolute -top-2 -right-2 w-6 h-6 bg-teal-700 rounded-full flex items-center justify-center'>
								<Check className='w-4 h-4 text-white' />
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
};

export default FrameSelector;
