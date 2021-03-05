module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts': 'ts-jest'
  },
  preset: 'jest-dynalite'
}
