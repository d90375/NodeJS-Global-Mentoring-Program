module.exports = {
  extends: ['eslint-config-airbnb-base', './base.js', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '_next' }],
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        varsIgnorePattern: '_next',
      },
    ],
  },
};
