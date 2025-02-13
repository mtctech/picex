import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./example/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			// '2xl': '1536px',
		},
	},
	plugins: [],
};

export default config;
