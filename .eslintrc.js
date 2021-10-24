module.exports = {
  extends: ['eslint-config-airbnb-base', './base.js', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '_next' }],
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        varsIgnorePattern: '_next',
      },
    ],
  },
};
