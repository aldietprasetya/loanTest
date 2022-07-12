const colors = require('tailwindcss/colors');

module.exports = {
	purge: {
		mode: 'layers',
		content: ['./public/**/*.html', './src/**/*.vue'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: {
          'white': '#F0F2F3',
          'black': '#020202',
          'green': '#6E8A6B',
          'grey': '#A7A2A6',
          'grey2': '#5F605D',
          'grey3': '#e5e5e5',
          'red': '#FA8762',
          'purple': '#9373C7'
        },
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
