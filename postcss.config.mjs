/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		'postcss-import': {},
		tailwindcss: {},
		'tailwindcss/nesting': {},
		autoprefixer: {},
		'postcss-pxtorem': {
			exclude: /styles\/globals.css/,
		},
	},
};

export default config;
