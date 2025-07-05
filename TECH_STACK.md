# J.O Transportation and Service Co., Ltd. - Technical Overview

## Tech Stack Summary

### Frontend
- **HTML5**: Standard markup language for the website structure
- **CSS3**: Used for styling with a combination of:
  - **Custom CSS**: Defined in `css/styles.css` with CSS variables for consistent theming
  - **Tailwind CSS**: Utility-first CSS framework loaded via CDN for responsive design
- **JavaScript (ES6+)**: Core programming language for client-side functionality
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Web fonts (Poppins and Playfair Display) for typography
- **EmailJS**: Third-party service for sending emails directly from client-side JavaScript

### Backend/Services
- **Firebase**: Google's platform used for:
  - **Google Analytics**: Tracking user behavior and website performance
  - No server-side code or database is used; this is a static website

### Deployment
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: CI/CD pipeline for automated deployment

### Internationalization
- **Custom i18n Implementation**: Multi-language support for:
  - English (default)
  - Thai
  - Chinese
  - Arabic (with RTL support)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Pages                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Static Content                       │    │
│  │                                                         │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │    │
│  │  │   HTML      │  │    CSS      │  │   JavaScript    │  │    │
│  │  │ - index.html│  │ - styles.css│  │ - script.js     │  │    │
│  │  │ - services.h│  │             │  │ - translations.js│  │    │
│  │  └─────────────┘  └─────────────┘  │ - firebase-init.js│  │    │
│  │                                    └─────────────────┘  │    │
│  │  ┌─────────────┐                                        │    │
│  │  │   Assets    │                                        │    │
│  │  │ - images    │                                        │    │
│  │  │ - videos    │                                        │    │
│  │  └─────────────┘                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────┬─────────────────────────────────────┘
                              │
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                          │
│                                                                 │
│  ┌─────────────────────┐        ┌───────────────────────────┐   │
│  │      Firebase       │        │         EmailJS           │   │
│  │  (Google Analytics) │        │  (Contact Form Handling)  │   │
│  └─────────────────────┘        └───────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **User Interaction**:
   - User visits the website hosted on GitHub Pages
   - Static content (HTML, CSS, JS, images) is served to the browser

2. **Analytics Tracking**:
   - Firebase Analytics tracks page views automatically
   - Custom events (button clicks, form submissions, etc.) are tracked using the `trackEvent` function

3. **Language Selection**:
   - User can select a language from the dropdown
   - JavaScript updates the UI text using the translations object
   - Language preference is stored in localStorage

4. **Contact Form Submission**:
   - User fills out the contact form
   - Client-side validation is performed
   - EmailJS sends the form data directly to the company's email
   - Success/error message is displayed to the user

## Key Features

1. **Responsive Design**: Adapts to different screen sizes using Tailwind CSS and custom media queries
2. **Multi-language Support**: Supports English, Thai, Chinese, and Arabic with RTL layout
3. **Video Rotation**: Hero section features rotating videos for visual interest
4. **Form Handling**: Contact form with validation and email sending via EmailJS
5. **Analytics**: Comprehensive event tracking with Firebase Analytics
6. **SEO Optimization**: Includes meta tags and structured data for search engines

## Deployment Process

The website is automatically deployed to GitHub Pages using GitHub Actions:
1. Developer pushes changes to the main branch
2. GitHub Actions workflow is triggered
3. The entire repository is uploaded as an artifact
4. The site is deployed to GitHub Pages
5. The updated site is available at the GitHub Pages URL

This architecture represents a modern, lightweight approach to web development, focusing on client-side functionality without the need for server-side processing or databases.