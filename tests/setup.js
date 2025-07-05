// Import Jest DOM extensions for DOM element assertions
import '@testing-library/jest-dom';

// Import custom mocks
const documentMock = require('./__mocks__/document');
const localStorageMock = require('./__mocks__/localStorage');
const emailjsMock = require('./__mocks__/emailjs');

// Mock global objects that might not be available in the test environment
global.window = global.window || {};
global.document = documentMock;

// Mock localStorage
global.localStorage = localStorageMock;

// Mock sessionStorage
if (!global.sessionStorage) {
  global.sessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };
}

// Mock navigator
global.navigator = global.navigator || {
  userAgent: 'node.js',
  language: 'en-US',
  connection: {
    type: 'wifi',
    effectiveType: '4g'
  }
};

// Mock EmailJS
global.emailjs = emailjsMock;

// Mock Firebase
global.firebase = {
  initializeApp: jest.fn(),
  analytics: jest.fn().mockReturnValue({
    logEvent: jest.fn()
  }),
  appCheck: jest.fn().mockReturnValue({
    activate: jest.fn()
  })
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
global.matchMedia = global.matchMedia || function(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};

// Mock alert
global.alert = jest.fn();

// Mock console methods
global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};
