module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
  setupFilesAfterEnv: [
    './setupTests.js',
  ],
  testMatch: ['**/__tests__/*.test.js?(x)'],
  modulePathIgnorePatterns: ['**/__tests__/__mocks__*.js?(x)']
};