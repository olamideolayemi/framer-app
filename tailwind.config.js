module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	safelist: [
		'focus:ring-[#2f554c]',
		'focus:border-[#457b6e]',
		'from-[#3f9b85]',
		'via-[#33cfbb]',
		'to-[#1c4138]',
		'to-[#457b6e]',
		'from-[#457b6e]',
		'bg-[#457b6e]',
		'text-[#457b6e]',
		'border-[#457b6e]',
		'bg-[#2f554c]',
	],
	theme: {
		extend: {
			colors: {
				'teal-custom': '#457b6e',
				'teal-custom-1': '#3f9b85',
				'teal-custom-2': '#34c4a2',
				'teal-custom-3': '#2f554c',
				'teal-custom-4': '#40ac93',
				'teal-custom-5': '#3fa38c',
			},
		},
		fontFamily: {
			century: ['Century Schoolbook', 'serif'],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
