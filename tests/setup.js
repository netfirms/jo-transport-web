// Import Jest DOM extensions for DOM element assertions
import '@testing-library/jest-dom';

// Mock global objects that might not be available in the test environment
global.window = global.window || {};
global.document = global.document || {
  createElement: () => ({
    style: {},
    setAttribute: () => {},
    appendChild: () => {}
  }),
  documentElement: {
    style: {},
    appendChild: () => {}
  },
  body: {
    appendChild: () => {},
    classList: {
      add: () => {},
      remove: () => {}
    }
  },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  getElementsByTagName: () => []
};

// Mock localStorage
if (!global.localStorage) {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  };
}

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
global.emailjs = {
  init: jest.fn(),
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' })
};

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