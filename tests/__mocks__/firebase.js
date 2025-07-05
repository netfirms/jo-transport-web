// Mock implementation of Firebase for tests
const firebase = {
  initializeApp: jest.fn(),
  analytics: jest.fn().mockReturnValue({
    logEvent: jest.fn()
  }),
  appCheck: jest.fn().mockReturnValue({
    activate: jest.fn()
  })
};

// Export the mock
module.exports = firebase;