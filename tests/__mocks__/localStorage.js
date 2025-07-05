// Mock implementation of localStorage for tests

// Storage object to keep track of key-value pairs
const storage = {};

// Create a localStorage mock with jest.fn() for tracking method calls
const localStorageMock = {
  getItem: jest.fn(key => storage[key] || null),
  setItem: jest.fn((key, value) => {
    storage[key] = String(value);
  }),
  removeItem: jest.fn(key => {
    delete storage[key];
  }),
  clear: jest.fn(() => {
    Object.keys(storage).forEach(key => {
      delete storage[key];
    });
  }),
  // Add key and length properties for completeness
  key: jest.fn(index => {
    const keys = Object.keys(storage);
    return index < keys.length ? keys[index] : null;
  }),
  get length() {
    return Object.keys(storage).length;
  }
};

module.exports = localStorageMock;