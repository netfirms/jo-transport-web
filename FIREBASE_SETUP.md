# Firebase Google Analytics Setup Guide

This guide will help you set up Firebase Google Analytics for your J.O Transportation website.

## Prerequisites

- A Google account
- Access to the Firebase console (https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project"
3. Enter a project name (e.g., "JO Transportation Website")
4. Choose whether to enable Google Analytics for your project (recommended: Yes)
5. Select your Google Analytics account or create a new one
6. Accept the terms and click "Create project"
7. Wait for the project to be created, then click "Continue"

## Step 2: Register Your Web App

1. From the Firebase project dashboard, click on the web icon (</>) to add a web app
2. Enter a nickname for your app (e.g., "JO Transportation Web")
3. Optionally, check the "Also set up Firebase Hosting" box if you plan to use Firebase Hosting
4. Click "Register app"
5. You'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

6. Copy this configuration object

## Step 3: Update Your Website Configuration

1. Open the file `js/firebase-init.js` in your website code
2. Replace the placeholder configuration with your actual Firebase configuration:

```javascript
// Replace this:
const firebaseConfig = {
  // Replace with your actual Firebase config values
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// With your actual configuration from Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyC1a8pQ7M...",
  authDomain: "jo-transportation.firebaseapp.com",
  projectId: "jo-transportation",
  storageBucket: "jo-transportation.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456",
  measurementId: "G-ABCDEF1234"
};
```

## Step 4: Deploy Your Website

1. Deploy your website with the updated Firebase configuration
2. The Firebase SDK and Google Analytics will be automatically initialized when users visit your site

## Step 5: View Analytics Data

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on "Analytics" in the left sidebar
4. You'll see various reports and data about your website visitors

## Custom Events

The Firebase integration is already set up to track the following events:

- **Page Views**: Automatically tracked when users visit any page
- **Outbound Link Clicks**: Tracked when users click on links to external websites
- **Form Submissions**: Tracked when users submit the quote request form
- **Service Card Clicks**: Tracked when users click on service cards

## Adding More Custom Events

If you want to track additional events, you can use the `trackEvent` function in your JavaScript code:

```javascript
// Example: Track a button click
document.getElementById('myButton').addEventListener('click', function() {
  trackEvent('button_click', {
    button_id: 'myButton',
    button_text: this.textContent
  });
});
```

## Troubleshooting

- **No data in Analytics**: It may take up to 24 hours for data to appear in the Firebase Analytics dashboard
- **Script errors**: Check the browser console for any JavaScript errors
- **Configuration issues**: Verify that you've correctly copied the Firebase configuration from the Firebase console

For more help, refer to the [Firebase Analytics documentation](https://firebase.google.com/docs/analytics).