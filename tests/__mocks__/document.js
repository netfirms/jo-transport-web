// Mock implementation of document for tests

// Keep track of attributes and classes
const attributes = {
  dir: '',
  lang: 'en'
};

const classList = {
  _items: new Set(),
  add(className) {
    this._items.add(className);
  },
  remove(className) {
    this._items.delete(className);
  },
  contains(className) {
    return this._items.has(className);
  },
  toggle(className) {
    if (this._items.has(className)) {
      this._items.delete(className);
    } else {
      this._items.add(className);
    }
  }
};

// Create a more complete document mock
const documentMock = {
  documentElement: {
    get dir() {
      return attributes.dir;
    },
    set dir(value) {
      attributes.dir = value;
    },
    get lang() {
      return attributes.lang;
    },
    set lang(value) {
      attributes.lang = value;
    },
    style: {},
    appendChild: jest.fn()
  },
  body: {
    appendChild: jest.fn(),
    classList: {
      ...classList,
      toString() {
        return Array.from(this._items).join(' ');
      }
    }
  },
  createElement: jest.fn().mockImplementation(() => ({
    style: {},
    setAttribute: jest.fn(),
    appendChild: jest.fn()
  })),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn().mockReturnValue([]),
  getElementById: jest.fn(),
  getElementsByTagName: jest.fn().mockReturnValue([])
};

module.exports = documentMock;