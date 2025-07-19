import { ROOM_OPTIONS } from '@/constants';
import { RoomSelectorProps } from '@/types';
import { Check, Eye } from 'lucide-react';
import Image from 'next/image';

const RoomSelector = ({ selected, onSelect }: RoomSelectorProps) => {
	return (
		<div className='mb-8'>
			<h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
				<Eye className='w-5 h-5 text-teal-600' />
				Room Preview
			</h3>

			<div className='grid grid-cols-2 gap-4'>
				{ROOM_OPTIONS.map((room) => (
					<button
						key={room.value}
						onClick={() => onSelect(room.value)}
						className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
							selected === room.value
								? 'border-teal-600 bg-indigo-50 shadow-lg'
								: 'border-gray-200 hover:border-teal-400'
						}`}
					>
						<div className='flex flex-col items-center space-y-2'>
							<div className='w-16 h-12 bg-gray-200 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-md'>
								<Image
									src={room.image}
									alt={room.name}
									className='w-full h-full object-cover rounded-lg'
									width={100}
									height={100}
								/>
							</div>
							<span className='text-sm font-medium'>{room.name}</span>
						</div>
						{selected === room.value && (
							<div className='absolute -top-2 -right-2 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center'>
								<Check className='w-4 h-4 text-white' />
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
};

export default RoomSelector;
