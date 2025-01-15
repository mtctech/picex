/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		project: ['./tsconfig.json'],
		// projectService: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'next/core-web-vitals',
		'plugin:eslint-plugin-next-on-pages/recommended',
		'prettier',
	],
	plugins: ['eslint-plugin-next-on-pages'],
	rules: {
		'@typescript-eslint/require-await': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-enum-comparison': 'off',
	},
};
