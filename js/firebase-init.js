// Firebase configuration and initialization
// This file initializes Firebase and Google Analytics

// Initialize Firebase with your web app's Firebase configuration
const firebaseConfig = {
  // Replace with your actual Firebase config values
  apiKey: "AIzaSyCBHStY61enxDbTbOYpKdUBh_2OCQco1Kk",
  authDomain: "jo-transport-web.firebaseapp.com",
  projectId: "jo-transport-web",
  storageBucket: "jo-transport-web.firebasestorage.app",
  messagingSenderId: "902014323168",
  appId: "1:902014323168:web:babc9d1700cec9d0e64385",
  measurementId: "G-C3BG49V9JG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = firebase.analytics();

// Track page views automatically
analytics.logEvent('page_view', {
  page_title: document.title,
  page_location: window.location.href,
  page_path: window.location.pathname
});

// Function to track custom events
function trackEvent(eventName, eventParams = {}) {
  analytics.logEvent(eventName, eventParams);
  console.log(`Event tracked: ${eventName}`, eventParams);
}

// Track outbound links
document.addEventListener('DOMContentLoaded', function() {
  // Track outbound link clicks
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const url = this.getAttribute('href');
      if (!url.includes(window.location.hostname)) {
        trackEvent('outbound_link_click', {
          link_url: url,
          link_text: this.textContent.trim()
        });
      }
    });
  });

  // Form submissions are tracked in the form submission handler in script.js

  // Track service card clicks
  document.querySelectorAll('.service-detail-item').forEach(card => {
    card.addEventListener('click', function() {
      const serviceName = this.querySelector('h3').textContent;
      trackEvent('service_card_click', {
        service_name: serviceName
      });
    });
  });
});
