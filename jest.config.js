module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts': 'ts-jest'
  }
}
