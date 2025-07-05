# J.O Transportation and Service Co., Ltd. - Technical Architecture

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

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└───────────────────────────┬─────────────────────────────────────┘
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
└─────────────────────────┬─────────────────────────────────────┘
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

## Low-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                     Client Browser                                                       │
│                                                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                                                  HTML Structure                                                  │    │
│  │                                                                                                                 │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │    │
│  │  │     Header      │  │  Hero Section   │  │  About Section  │  │ Services Section│  │  Fleet Section  │       │    │
│  │  │ - Logo          │  │ - Video Slider  │  │ - Company Info  │  │ - Service Cards │  │ - Vehicle Cards │       │    │
│  │  │ - Navigation    │  │ - CTA Button    │  │ - Team Image    │  │ - Learn More    │  │ - Details       │       │    │
│  │  │ - Lang Selector │  │                 │  │                 │  │                 │  │                 │       │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘       │    │
│  │                                                                                                                 │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                                                  │    │
│  │  │Customers Section│  │ Contact Section │  │     Footer      │                                                  │    │
│  │  │ - Client Logos  │  │ - Contact Info  │  │ - Quick Links   │                                                  │    │
│  │  │                 │  │ - Contact Form  │  │ - Social Media  │                                                  │    │
│  │  │                 │  │                 │  │ - Copyright     │                                                  │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘                                                  │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                                                CSS Styling                                                       │    │
│  │                                                                                                                 │    │
│  │  ┌─────────────────────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────────┐             │    │
│  │  │      Custom CSS (styles.css) │  │        Tailwind CSS         │  │       Responsive Design      │             │    │
│  │  │ - CSS Variables             │  │ - Utility Classes           │  │ - Mobile Menu               │             │    │
│  │  │ - Global Styles             │  │ - Responsive Grid           │  │ - Media Queries             │             │    │
│  │  │ - Section-specific Styles   │  │ - Flexbox Utilities         │  │ - Adaptive Layouts          │             │    │
│  │  │ - Animations                │  │                             │  │                             │             │    │
│  │  └─────────────────────────────┘  └─────────────────────────────┘  └─────────────────────────────┘             │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐    │
│  │                                            JavaScript Functionality                                              │    │
│  │                                                                                                                 │    │
│  │  ┌─────────────────────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────────┐             │    │
│  │  │      Core Functionality     │  │    Internationalization     │  │      Firebase Analytics      │             │    │
│  │  │ (script.js)                 │  │ (translations.js)           │  │ (firebase-init.js)          │             │    │
│  │  │ - Mobile Menu Toggle        │  │ - Language Definitions      │  │ - Analytics Initialization  │             │    │
│  │  │ - Smooth Scrolling          │  │ - Language Switching        │  │ - Event Tracking            │             │    │
│  │  │ - Form Validation           │  │ - RTL Support               │  │ - Page View Tracking        │             │    │
│  │  │ - Video Rotation            │  │ - Content Translation       │  │                             │             │    │
│  │  │ - Scroll Effects            │  │                             │  │                             │             │    │
│  │  └─────────────────────────────┘  └─────────────────────────────┘  └─────────────────────────────┘             │    │
│  │                                                                                                                 │    │
│  │  ┌─────────────────────────────┐  ┌─────────────────────────────┐                                              │    │
│  │  │      Form Handling          │  │      Event Tracking         │                                              │    │
│  │  │ - Input Validation          │  │ - User Interactions         │                                              │    │
│  │  │ - EmailJS Integration       │  │ - Form Submissions          │                                              │    │
│  │  │ - Success/Error Handling    │  │ - Navigation Events         │                                              │    │
│  │  │ - Rate Limiting             │  │ - Language Changes          │                                              │    │
│  │  └─────────────────────────────┘  └─────────────────────────────┘                                              │    │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                          │
                                                          ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                  External Services                                                       │
│                                                                                                                         │
│  ┌─────────────────────────────────────────┐                          ┌─────────────────────────────────────────┐       │
│  │               Firebase                  │                          │                EmailJS                  │       │
│  │                                         │                          │                                         │       │
│  │  ┌─────────────────────────────────┐    │                          │  ┌─────────────────────────────────┐    │       │
│  │  │        Google Analytics         │    │                          │  │       Email Service (SMTP)      │    │       │
│  │  │ - User Behavior Tracking        │    │                          │  │ - Contact Form Processing       │    │       │
│  │  │ - Custom Event Logging          │    │                          │  │ - Email Template Rendering      │    │       │
│  │  │ - Performance Monitoring        │    │                          │  │ - Email Delivery                │    │       │
│  │  └─────────────────────────────────┘    │                          │  └─────────────────────────────────┘    │       │
│  │                                         │                          │                                         │       │
│  └─────────────────────────────────────────┘                          └─────────────────────────────────────────┘       │
│                                                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **User Interaction**:
   - User visits the website hosted on GitHub Pages
   - Static content (HTML, CSS, JS, images) is served to the browser
   - JavaScript initializes:
     - Firebase Analytics for tracking
     - Language settings based on user preference
     - Video rotation in the hero section
     - Event listeners for interactive elements

2. **Language Selection**:
   - User selects a language from the dropdown
   - `changeLanguage()` function in script.js is triggered
   - Language preference is stored in localStorage
   - `updatePageContent()` function updates all text elements with translations
   - RTL layout is applied for Arabic language

3. **Navigation**:
   - User clicks on navigation links
   - Smooth scrolling is applied to navigate to the selected section
   - Active section is highlighted in the navigation
   - Mobile menu toggles on smaller screens
   - Events are tracked via Firebase Analytics

4. **Video Rotation**:
   - Hero section videos are loaded progressively
   - Videos play in sequence with smooth transitions
   - Lazy loading is implemented for performance optimization
   - Video switching events are tracked

5. **Contact Form Submission**:
   - User fills out the contact form
   - Client-side validation is performed with security measures:
     - Input sanitization
     - Rate limiting
     - Regex validation
   - EmailJS sends the form data directly to the company's email
   - Success/error message is displayed to the user
   - Form submission is tracked in analytics

6. **Analytics Tracking**:
   - Firebase Analytics tracks page views automatically
   - Custom events are tracked using the `trackEvent` function:
     - Navigation clicks
     - Form submissions
     - Language changes
     - Service card interactions
     - Social media clicks
     - Outbound link clicks

## Key Components

### HTML Structure
- **index.html**: Main landing page with all sections
- **services.html**: Detailed services page

### CSS Components
- **styles.css**: Custom styling with CSS variables
- **Tailwind CSS**: Utility classes for responsive design

### JavaScript Modules
- **script.js**: Core functionality and event handling
- **translations.js**: Multi-language support
- **firebase-init.js**: Analytics configuration
- **services.js**: Services page specific functionality

### External Services
- **Firebase Analytics**: User behavior tracking
- **EmailJS**: Contact form handling

## Deployment Process

The website is automatically deployed to GitHub Pages using GitHub Actions:
1. Developer pushes changes to the main branch
2. GitHub Actions workflow is triggered
3. The entire repository is uploaded as an artifact
4. The site is deployed to GitHub Pages
5. The updated site is available at the GitHub Pages URL

This architecture represents a modern, lightweight approach to web development, focusing on client-side functionality without the need for server-side processing or databases. The site is optimized for performance, accessibility, and SEO.