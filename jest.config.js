module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: ['node_modules/firebase/firestore/lite'],
  // transform: {
  //   "\\.[jt]sx?$": "babel-jest"
  // }
}