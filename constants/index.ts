export const SIZE_DIMENSIONS: Record<string, string> = {
	'5x7 in': 'w-[100px] h-[140px]',
	'6x9 in': 'w-[110px] h-[160px]',
	'A4 (8x12 in)': 'w-[120px] h-[180px]',
	'10x13 in': 'w-[130px] h-[190px]',
	'11x14 in': 'w-[135px] h-[200px]',
	'12x16 in': 'w-[140px] h-[210px]',
	'14x18 in': 'w-[150px] h-[220px]',
	'16x20 in': 'w-[160px] h-[230px]',
	'16x24 in': 'w-[165px] h-[250px]',
	'18x24 in': 'w-[170px] h-[260px]',
	'20x24 in': 'w-[180px] h-[270px]',
	'20x30 in': 'w-[190px] h-[290px]',
	'21x37 in': 'w-[200px] h-[310px]',
	'24x30 in': 'w-[210px] h-[320px]',
	'24x36 in': 'w-[220px] h-[340px]',
	'27x40 in': 'w-[230px] h-[360px]',
	'30x40 in': 'w-[240px] h-[370px]',
	'36x48 in': 'w-[260px] h-[390px]',
};

export const FRAME_STYLES: Record<string, string> = {
	black: 'border-8 border-black',
	frame_4: '/frames/frame_4.png',
  frame_5: '/frames/frame_5.png',
};

export const ROOM_OPTIONS = [
	{
		name: 'Living Room',
		value: 'living-room.jpg',
		image: '/rooms/living-room.jpg',
	},
	{ name: 'Office', value: 'office.jpg', image: '/rooms/office.jpg' },
	{ name: 'Bedroom', value: 'bedroom.jpg', image: '/rooms/bedroom.jpg' },
	{ name: 'Kitchen', value: 'kitchen.jpg', image: '/rooms/kitchen.jpg' },
];

// export const FRAME_OPTIONS = [
// 	{
// 		name: 'Living Room',
// 		value: 'living-room.jpg',
// 		image: '/rooms/living-room.jpg',
// 	},
// 	{ name: 'Office', value: 'office.jpg', image: '/rooms/office.jpg' },
// 	{ name: 'Bedroom', value: 'bedroom.jpg', image: '/rooms/bedroom.jpg' },
// 	{ name: 'Kitchen', value: 'kitchen.jpg', image: '/rooms/kitchen.jpg' },
// ];

export const FRAME_OPTIONS = [
	{
		label: 'black',
		colorClass: 'bg-black',
		// description: 'Elegant gold carved pattern'
	},
	{
		label: 'frame 4',
		image: '/frames/frame_4.png',
		// description: 'Elegant gold carved pattern'
	},
	{
		label: 'frame 5',
		image: '/frames/frame_5.png',
		// description: 'Elegant gold carved pattern'
	},
	{
		label: 'frame 1',
		image: '/frames/frame_1.png',
		// description: 'Elegant gold carved pattern'
	},
	{
		label: 'frame 2',
		image: '/frames/frame_2.png',
		// description: 'Elegant gold carved pattern'
	},
	{
		label: 'frame 3',
		image: '/frames/frame_3.png',
		// description: 'Elegant frame_3', carved pattern'
	},
	{
		label: 'frame 6',
		image: '/frames/frame_6.png',
		// description: 'Elegant frame_3', carved pattern'
	},
	{
		label: 'frame 7',
		image: '/frames/frame_7.png',
		// description: 'Elegant frame_3', carved pattern'
	},
];

export const SIZE_OPTIONS = [
	'5x7 in',
	'6x9 in',
	'A4 (8x12 in)',
	'10x13 in',
	'11x14 in',
	'12x16 in',
	'14x18 in',
	'16x20 in',
	'16x24 in',
	'18x24 in',
	'20x24 in',
	'20x30 in',
	'21x37 in',
	'24x30 in',
	'24x36 in',
	'27x40 in',
	'30x40 in',
	'36x48 in',
];
