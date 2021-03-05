module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/start/**'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts': 'ts-jest'
  },
  preset: 'jest-dynalite'
}
