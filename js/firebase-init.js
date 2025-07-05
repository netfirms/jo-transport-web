// Firebase configuration and initialization
// This file initializes Firebase and Google Analytics

// Initialize Firebase with your web app's Firebase configuration
// Config is restricted to this domain through Firebase Console settings
const firebaseConfig = {
  apiKey: "AIzaSyCBHStY61enxDbTbOYpKdUBh_2OCQco1Kk",
  authDomain: "jo-transport-web.firebaseapp.com",
  projectId: "jo-transport-web",
  storageBucket: "jo-transport-web.firebasestorage.app",
  messagingSenderId: "902014323168",
  appId: "1:902014323168:web:babc9d1700cec9d0e64385",
  measurementId: "G-C3BG49V9JG"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Check if we're in a production environment
const isProduction = window.location.hostname === 'jotransportation.com' || 
                     window.location.hostname === 'www.jotransportation.com';

// Initialize App Check in production
if (isProduction && typeof firebase.appCheck !== 'undefined') {
  // Use reCAPTCHA v3 for App Check
  const appCheck = firebase.appCheck();
  // Replace 'YOUR_RECAPTCHA_SITE_KEY' with your actual reCAPTCHA site key
  // You need to register for reCAPTCHA v3 in Google Cloud Console
  // and add the site key to your Firebase project
  appCheck.activate('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', true);
}

// Initialize Analytics
const analytics = firebase.analytics();

// Track page views automatically
analytics.logEvent('page_view', {
  page_title: document.title,
  page_location: window.location.href,
  page_path: window.location.pathname
});

// Function to track custom events - removed console logging for security
function trackEvent(eventName, eventParams = {}) {
  if (typeof analytics !== 'undefined' && analytics) {
    analytics.logEvent(eventName, eventParams);
  }
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
