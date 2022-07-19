module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/prisma/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.ts(x)?',
    '!src/**/styles.ts',
    '!src/**/types.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleDirectories: ['node_modules', 'src']
}
