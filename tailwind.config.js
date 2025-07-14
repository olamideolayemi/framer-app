module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'teal-custom': '#457b6e',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
