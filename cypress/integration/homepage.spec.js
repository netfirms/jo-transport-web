/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
    
    // Wait for page to load completely
    cy.get('header').should('be.visible');
  });

  it('should have the correct title', () => {
    cy.title().should('include', 'J.O Transportation');
  });

  it('should have a visible header with logo and navigation', () => {
    // Check header
    cy.get('header').should('be.visible');
    
    // Check logo
    cy.get('header img').should('be.visible');
    
    // Check navigation
    cy.get('nav ul li').should('have.length.at.least', 4);
  });

  it('should have a hero section with heading and CTA button', () => {
    // Check hero section
    cy.get('section.hero').should('be.visible');
    
    // Check heading
    cy.get('section.hero h1').should('be.visible');
    
    // Check CTA button
    cy.get('section.hero a.btn').should('be.visible')
      .and('contain.text', 'Get a Quote');
  });

  it('should navigate to sections when nav links are clicked', () => {
    // Click on About link
    cy.get('nav ul li a[href="#about"]').click();
    
    // Check if About section is in viewport
    cy.get('section#about').should('be.visible').isInViewport();
    
    // Click on Services link
    cy.get('nav ul li a[href="#services"]').click();
    
    // Check if Services section is in viewport
    cy.get('section#services').should('be.visible').isInViewport();
  });

  it('should display mobile menu on small screens', () => {
    // Set viewport to mobile size
    cy.viewport('iphone-x');
    
    // Mobile menu button should be visible
    cy.get('.mobile-menu-btn').should('be.visible');
    
    // Nav should be hidden initially on mobile
    cy.get('nav').should('not.be.visible');
    
    // Click mobile menu button
    cy.get('.mobile-menu-btn').click();
    
    // Nav should now be visible
    cy.get('nav').should('be.visible');
    
    // Click outside to close menu
    cy.get('header').click({ position: 'top' });
    
    // Nav should be hidden again
    cy.get('nav').should('not.be.visible');
  });

  it('should switch language when language selector is changed', () => {
    // Get initial heading text
    cy.get('section.hero h1').invoke('text').then((englishText) => {
      // Switch to Thai
      cy.switchLanguage('th');
      
      // Heading text should change
      cy.get('section.hero h1').invoke('text').should('not.equal', englishText);
      
      // Switch back to English
      cy.switchLanguage('en');
      
      // Heading text should be back to original
      cy.get('section.hero h1').invoke('text').should('equal', englishText);
    });
  });

  it('should handle RTL layout for Arabic language', () => {
    // Switch to Arabic
    cy.switchLanguage('ar');
    
    // HTML should have RTL direction
    cy.get('html').should('have.attr', 'dir', 'rtl');
    
    // Body should have RTL class
    cy.get('body').should('have.class', 'rtl');
  });
});

describe('Contact Form', () => {
  beforeEach(() => {
    // Visit the homepage and scroll to contact section
    cy.visit('/');
    cy.get('a[href="#contact"]').click();
    cy.get('#contact').should('be.visible');
  });

  it('should display validation errors for empty required fields', () => {
    // Submit form without filling required fields
    cy.get('#quote-form button[type="submit"]').click();
    
    // Check for alert (using cy.on to handle alerts)
    cy.on('window:alert', (text) => {
      expect(text).to.include('required fields');
    });
  });

  it('should display validation error for invalid email', () => {
    // Fill name and service but use invalid email
    cy.fillContactForm('Test User', 'invalid-email', '', 'airport', '');
    
    // Submit form
    cy.get('#quote-form button[type="submit"]').click();
    
    // Check for alert
    cy.on('window:alert', (text) => {
      expect(text).to.include('valid email');
    });
  });

  it('should display validation error for invalid phone', () => {
    // Fill required fields but use invalid phone
    cy.fillContactForm('Test User', 'test@example.com', 'not-a-phone', 'airport', '');
    
    // Submit form
    cy.get('#quote-form button[type="submit"]').click();
    
    // Check for alert
    cy.on('window:alert', (text) => {
      expect(text).to.include('valid phone');
    });
  });

  it('should accept valid form submission', () => {
    // Fill all fields with valid data
    cy.fillContactForm(
      'Test User',
      'test@example.com',
      '+1 (555) 123-4567',
      'airport',
      'This is a test message'
    );
    
    // Intercept EmailJS request (if in development environment)
    cy.window().then((win) => {
      if (win.location.hostname === 'localhost') {
        // In development, form submission is simulated
        cy.get('#quote-form button[type="submit"]').click();
        
        // Check for success message after a delay
        cy.get('.success-message', { timeout: 5000 })
          .should('be.visible')
          .and('contain.text', 'Thank You');
      } else {
        // In production, we would need to mock the EmailJS service
        // This is just a placeholder for how it would be tested
        cy.log('Skipping form submission test in production environment');
      }
    });
  });
});

describe('Responsive Design', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should adapt layout for mobile devices', () => {
    // Test on iPhone X
    cy.viewport('iphone-x');
    
    // Header should still be visible
    cy.get('header').should('be.visible');
    
    // Mobile menu button should be visible
    cy.get('.mobile-menu-btn').should('be.visible');
    
    // Hero section should be visible and properly sized
    cy.get('section.hero').should('be.visible');
    cy.get('section.hero h1').should('be.visible');
    
    // Services cards should stack vertically
    cy.get('#services .grid > div').first()
      .should('have.css', 'width')
      .and('match', /100%|auto/);
  });

  it('should adapt layout for tablets', () => {
    // Test on iPad
    cy.viewport('ipad-2');
    
    // Header should be visible
    cy.get('header').should('be.visible');
    
    // Services cards should be in a grid with fewer columns
    cy.get('#services .grid')
      .should('have.css', 'grid-template-columns')
      .and('not.match', /repeat\(4/); // Not 4 columns
  });

  it('should adapt layout for desktops', () => {
    // Test on large desktop
    cy.viewport(1920, 1080);
    
    // Header should be visible
    cy.get('header').should('be.visible');
    
    // Services cards should be in a grid with more columns
    cy.get('#services .grid > div').should('have.length.at.least', 3);
  });
});