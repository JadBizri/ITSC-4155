/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: ['prettier-plugin-tailwindcss'],
	singleQuote: true,
	printWidth: 120,
	trailingComma: 'all',
	endOfLine: 'lf',
	arrowParens: 'avoid',
	useTabs: true,
};

export default config;
