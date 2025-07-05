// Mock implementation of emailjs for tests

// Create an emailjs mock with jest.fn() for tracking method calls
const emailjsMock = {
  init: jest.fn(),
  send: jest.fn().mockImplementation((serviceID, templateID, templateParams) => {
    // Return a resolved promise to simulate successful email sending
    return Promise.resolve({
      status: 200,
      text: 'OK'
    });
  })
};

module.exports = emailjsMock;