import { ROOM_OPTIONS } from "@/constants";

const RoomSelector = ({ selected, onSelect }: RoomSelectorProps) => {
	return (
		<div className='mb-6'>
			<label className='block mb-2 font-medium text-gray-700'>
				Choose Room Background
			</label>
			<div className='flex space-x-4'>
				{ROOM_OPTIONS.map((room) => (
					<button
						key={room.value}
						onClick={() => onSelect(room.value)}
						className={`px-4 py-2 rounded border text-sm transition ${
							selected === room.value
								? 'bg-gray-800 text-white border-gray-900'
								: 'bg-white text-gray-800 border-gray-400'
						}`}
					>
						{room.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default RoomSelector;
