module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: 'airbnb',
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		"max-len": ["error", { "code": 180 }],
		"no-unused-vars": "warn",
		"no-undef": "warn",
		"react/react-in-jsx-scope": "off",
		"import/prefer-default-export": "off",
		"react/prop-types": "off",
		"import/no-extraneous-dependencies": "off"
	},
};
