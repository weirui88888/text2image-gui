module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'space-before-function-paren': 0,
    'multiline-ternary': 0,
    'array-callback-return': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/triple-slash-reference': 0,
    '@typescript-eslint/member-delimiter-style': 0
  },
  ignorePatterns: ['.eslintrc.js', 'commitlint.config.js'],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
