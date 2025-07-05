module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // The root directory that Jest should scan for tests and modules
  rootDir: '.',
  
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/tests'],
  
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
  // An array of regexp pattern strings that are matched against all test paths
  // matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  
  // An array of regexp pattern strings that are matched against all source file paths
  // matched files will have their coverage information collected
  collectCoverageFrom: ['js/**/*.js'],
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Setup files to run before each test
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Mock files for specific modules
  moduleNameMapper: {
    // Mock CSS imports
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
    // Mock image imports
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  
  // Transform files with babel-jest
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};