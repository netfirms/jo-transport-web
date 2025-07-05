/**
 * Unit tests for firebase-init.js
 */

// Import testing utilities
import '@testing-library/jest-dom';

describe('Firebase Initialization', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock window.location
    delete global.window.location;
    global.window.location = {
      hostname: 'jotransportation.com',
      href: 'https://jotransportation.com/',
      pathname: '/'
    };
    
    // Load the firebase-init.js file
    require('../js/firebase-init.js');
  });
  
  test('should initialize Firebase with correct config', () => {
    // Check if Firebase was initialized with the correct config
    expect(global.firebase.initializeApp).toHaveBeenCalledWith({
      apiKey: "AIzaSyCBHStY61enxDbTbOYpKdUBh_2OCQco1Kk",
      authDomain: "jo-transport-web.firebaseapp.com",
      projectId: "jo-transport-web",
      storageBucket: "jo-transport-web.firebasestorage.app",
      messagingSenderId: "902014323168",
      appId: "1:902014323168:web:babc9d1700cec9d0e64385",
      measurementId: "G-C3BG49V9JG"
    });
  });
  
  test('should initialize App Check in production environment', () => {
    // Check if App Check was initialized
    expect(global.firebase.appCheck).toHaveBeenCalled();
    
    // Get the mock App Check instance
    const appCheckMock = global.firebase.appCheck.mock.results[0].value;
    
    // Check if activate was called with the correct parameters
    expect(appCheckMock.activate).toHaveBeenCalledWith('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', true);
  });
  
  test('should initialize Analytics and track page view', () => {
    // Check if Analytics was initialized
    expect(global.firebase.analytics).toHaveBeenCalled();
    
    // Get the mock Analytics instance
    const analyticsMock = global.firebase.analytics.mock.results[0].value;
    
    // Check if logEvent was called with page_view event
    expect(analyticsMock.logEvent).toHaveBeenCalledWith('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  });
  
  test('should not initialize App Check in non-production environment', () => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Set non-production hostname
    delete global.window.location;
    global.window.location = {
      hostname: 'localhost',
      href: 'http://localhost:8080/',
      pathname: '/'
    };
    
    // Reload the firebase-init.js file
    jest.isolateModules(() => {
      require('../js/firebase-init.js');
    });
    
    // Check if App Check was not initialized
    expect(global.firebase.appCheck).not.toHaveBeenCalled();
  });
});

describe('Event Tracking', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Load the firebase-init.js file
    require('../js/firebase-init.js');
    
    // Get the trackEvent function
    global.trackEvent = require('../js/firebase-init.js').trackEvent;
  });
  
  test('should track custom events with parameters', () => {
    // Create mock analytics instance
    const analyticsMock = {
      logEvent: jest.fn()
    };
    
    // Set global analytics
    global.analytics = analyticsMock;
    
    // Track a custom event
    global.trackEvent('button_click', { button_id: 'submit', button_text: 'Submit' });
    
    // Check if logEvent was called with the correct parameters
    expect(analyticsMock.logEvent).toHaveBeenCalledWith('button_click', {
      button_id: 'submit',
      button_text: 'Submit'
    });
  });
  
  test('should handle errors when tracking events', () => {
    // Create mock analytics instance that throws an error
    const analyticsMock = {
      logEvent: jest.fn().mockImplementation(() => {
        throw new Error('Analytics error');
      })
    };
    
    // Set global analytics
    global.analytics = analyticsMock;
    
    // Track a custom event (should not throw)
    expect(() => {
      global.trackEvent('button_click', { button_id: 'submit' });
    }).not.toThrow();
    
    // Check if console.warn was called
    expect(global.console.warn).toHaveBeenCalled();
  });
  
  test('should not throw if analytics is not defined', () => {
    // Set analytics to undefined
    global.analytics = undefined;
    
    // Track a custom event (should not throw)
    expect(() => {
      global.trackEvent('button_click', { button_id: 'submit' });
    }).not.toThrow();
  });
});

describe('Outbound Link Tracking', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Set up DOM for link tracking
    document.body.innerHTML = `
      <a href="https://jotransportation.com/about">Internal Link</a>
      <a href="https://example.com">External Link</a>
      <a href="https://google.com">Google</a>
    `;
    
    // Mock trackEvent function
    global.trackEvent = jest.fn();
    
    // Load the firebase-init.js file
    require('../js/firebase-init.js');
  });
  
  test('should track clicks on external links', () => {
    // Click on external link
    const externalLink = document.querySelector('a[href="https://example.com"]');
    externalLink.click();
    
    // Check if trackEvent was called with the correct parameters
    expect(global.trackEvent).toHaveBeenCalledWith('outbound_link_click', {
      link_url: 'https://example.com',
      link_text: 'External Link'
    });
  });
  
  test('should not track clicks on internal links', () => {
    // Set window.location.hostname
    delete global.window.location;
    global.window.location = {
      hostname: 'jotransportation.com'
    };
    
    // Click on internal link
    const internalLink = document.querySelector('a[href="https://jotransportation.com/about"]');
    internalLink.click();
    
    // Check that trackEvent was not called
    expect(global.trackEvent).not.toHaveBeenCalled();
  });
});