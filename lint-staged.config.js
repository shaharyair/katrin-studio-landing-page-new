/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config = {
	"*.{js,jsx,ts,tsx}": [() => "tsc --noEmit", "eslint --fix ", "prettier --write"],
};

export default config;
