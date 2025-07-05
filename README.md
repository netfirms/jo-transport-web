# J.O Transportation and service Co..Ltd. Website

This repository contains the website for J.O Transportation and service Co..Ltd., a premium transportation service company.

## Deploying to GitHub Pages

This repository is configured to automatically deploy to GitHub Pages using GitHub Actions. Here's how to set it up:

### Prerequisites

1. Push this repository to GitHub.
2. Ensure your repository is public, or you have a GitHub Pro account (for private repository GitHub Pages).

### Setup GitHub Pages

1. Go to your GitHub repository.
2. Navigate to Settings > Pages.
3. Under "Source", select "GitHub Actions" as the deployment source.

### Automatic Deployment

The website will automatically deploy to GitHub Pages when:
- You push changes to the `main` branch
- You manually trigger the workflow from the Actions tab

### Manual Deployment

To manually deploy:
1. Go to your GitHub repository.
2. Navigate to the Actions tab.
3. Select the "Deploy to GitHub Pages" workflow.
4. Click "Run workflow" and select the branch you want to deploy.

### Viewing Your Deployed Site

After successful deployment, your site will be available at:
`https://[your-github-username].github.io/[repository-name]/`

## Local Development

To work on this website locally:

1. Clone the repository
2. Open `index.html` in your browser to view the site
3. Make changes to the HTML, CSS, or JavaScript files
4. Refresh your browser to see the changes
5. Commit and push your changes to GitHub to trigger deployment

## Project Structure

- `index.html` - Main page of the website
- `services.html` - Services details page
- `js/` - Contains JavaScript files
  - `script.js` - Main JavaScript functionality
  - `translations.js` - Multilingual support
  - `firebase-init.js` - Firebase and Google Analytics initialization
- `images/` - Contains image assets
- `info/` - Contains additional images and information
- `.github/workflows/deploy.yml` - GitHub Actions workflow for deployment
- `.nojekyll` - Prevents GitHub Pages from processing the site with Jekyll
- `FIREBASE_SETUP.md` - Guide for setting up Firebase Google Analytics

## CSS Implementation

This website uses Tailwind CSS for styling. Tailwind is a utility-first CSS framework that allows for rapid UI development with pre-defined utility classes.

### Benefits of Tailwind CSS

- **Faster Development**: Build custom designs without writing custom CSS
- **Responsive Design**: Built-in responsive design utilities
- **Consistency**: Predefined design system with consistent spacing, colors, etc.
- **Smaller File Size**: Only includes the utilities you use (when properly configured)
- **Easier Maintenance**: Changes can be made directly in HTML without modifying separate CSS files

### Implementation Details

- Tailwind CSS is included via CDN for simplicity
- Custom configuration is included in the `<head>` section of `index.html`
- Custom colors, fonts, shadows, and border radius values are defined to match the brand
- Some custom CSS is still used for complex elements that can't be easily styled with utility classes

### Future Development

For production environments, consider:

1. Setting up a build process with npm to optimize the CSS size
2. Using PostCSS with Tailwind for additional features
3. Extracting common patterns into reusable components

To set up a build process:

```bash
# Install dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init

# Create a CSS file that imports Tailwind
# Then build it with:
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

## Implementation Summary

### GitHub Pages Deployment

The following files have been added to enable GitHub Pages deployment:

1. `.github/workflows/deploy.yml` - A GitHub Actions workflow that automatically deploys the website to GitHub Pages when changes are pushed to the main branch or when manually triggered.
2. `.nojekyll` - An empty file that prevents GitHub Pages from processing the site with Jekyll, ensuring that all files are served exactly as they are in the repository.
3. `README.md` - This file, which provides documentation on how to deploy the website to GitHub Pages.

To use this deployment setup:

1. Push this repository to GitHub
2. Go to your repository's Settings > Pages
3. Under "Source", select "GitHub Actions"
4. Your site will automatically deploy when you push changes to the main branch

### Firebase Google Analytics

The following files have been added to enable Firebase Google Analytics:

1. `js/firebase-init.js` - Initializes Firebase and Google Analytics, and sets up event tracking.
2. Firebase SDK scripts added to `index.html` and `services.html`.
3. `FIREBASE_SETUP.md` - A guide that provides detailed instructions for setting up Firebase Google Analytics.

To use Firebase Analytics:

1. Follow the instructions in the [Firebase Setup Guide](FIREBASE_SETUP.md)
2. Update the configuration in `js/firebase-init.js` with your Firebase project details
3. Deploy your website to start collecting analytics data

## Email Service Integration

The website includes a quote request form that sends emails using EmailJS. Here's how to set it up:

### Setting Up EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an Email Service (e.g., Gmail, Outlook, etc.) in your EmailJS dashboard
3. Create an Email Template with the following template variables:
   - `{{from_name}}` - The name of the person submitting the form
   - `{{from_email}}` - The email address of the person submitting the form
   - `{{from_phone}}` - The phone number of the person submitting the form
   - `{{service_type}}` - The type of service requested
   - `{{message}}` - Additional details provided in the form

### Configuring the Website

After setting up EmailJS, you need to update the following files:

1. Open `js/script.js`
2. Replace `YOUR_PUBLIC_KEY` with your actual EmailJS public key (around line 11)
3. Replace `YOUR_SERVICE_ID` with your actual EmailJS service ID (around line 120)
4. Replace `YOUR_TEMPLATE_ID` with your actual EmailJS template ID (around line 120)

### Testing the Form

After configuration:
1. Open the website
2. Fill out the quote request form
3. Submit the form
4. You should receive an email with the form details
5. The form should display a success message if everything is configured correctly

## Viewport Configuration

The website uses specific viewport meta tag settings to ensure consistent rendering across different environments, particularly between local development and GitHub Pages:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
```

These settings help address the following issues:

- **width=device-width, initial-scale=1.0**: Sets the width of the viewport to the device width and initial zoom level to 1.0
- **maximum-scale=1.0**: Prevents users from zooming in beyond 1.0, maintaining consistent layout
- **user-scalable=no**: Disables user scaling/zooming, which can cause layout inconsistencies
- **shrink-to-fit=no**: Prevents iOS from automatically scaling down content to fit the viewport

This configuration was implemented to fix page size differences between local development environments and GitHub Pages deployment.

## Firebase Google Analytics Integration

The website is integrated with Firebase Google Analytics to track user interactions and gather insights about website usage. To set up Firebase Google Analytics:

1. Create a Firebase project
2. Register your web app
3. Update the configuration in `js/firebase-init.js`
4. Deploy your website

For detailed instructions, see the [Firebase Setup Guide](FIREBASE_SETUP.md).

### Tracked Events

The following events are automatically tracked:

- **Page Views**: When users visit any page
- **Outbound Link Clicks**: When users click on links to external websites
- **Form Submissions**: When users submit the quote request form
- **Service Card Clicks**: When users click on service cards

You can add custom event tracking using the `trackEvent()` function. See the [Firebase Setup Guide](FIREBASE_SETUP.md) for examples.

## Contact

For questions or issues regarding this website, please contact the repository owner.
