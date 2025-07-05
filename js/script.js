document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    // To set up EmailJS:
    // 1. Create an account at https://www.emailjs.com/
    // 2. Create an Email Service (e.g., Gmail, Outlook, etc.)
    // 3. Create an Email Template with template variables: {{from_name}}, {{from_email}}, {{from_phone}}, {{service_type}}, {{message}}
    // 4. Get your EmailJS Public Key, Service ID, and Template ID from the EmailJS dashboard
    // 5. Replace the placeholders below with your actual values
    (function() {
        // EmailJS initialization with domain restriction
        // The key is restricted to jotransportation.com domain in EmailJS dashboard
        const emailJSKey = "44SbPdv3lcp7pJ3VE";

        // Check if we're in a production environment
        const isProduction = window.location.hostname === 'jotransportation.com' || 
                            window.location.hostname === 'www.jotransportation.com';

        // Only initialize EmailJS in production or on localhost for testing
        if (isProduction || window.location.hostname === 'localhost') {
            emailjs.init(emailJSKey);
        }
    })();

    // Add event tracking for fleet vehicle cards
    document.querySelectorAll('#fleet .grid > div').forEach(card => {
        card.addEventListener('click', function() {
            const vehicleName = this.querySelector('h3').textContent;
            const vehicleType = this.querySelector('.absolute').textContent;

            if (typeof trackEvent === 'function') {
                trackEvent('fleet_card_click', {
                    vehicle_name: vehicleName,
                    vehicle_type: vehicleType
                });
            }
        });
    });

    // Track "Learn More" button clicks in services section
    document.querySelectorAll('#services a[href="services.html"]').forEach(link => {
        link.addEventListener('click', function() {
            const serviceTitle = this.closest('.flex-col').querySelector('h3').textContent;

            if (typeof trackEvent === 'function') {
                trackEvent('learn_more_click', {
                    service_name: serviceTitle
                });
            }
        });
    });

    // Track "Get a Quote" button click in hero section
    const quoteButton = document.querySelector('.hero a[href="#contact"]');
    if (quoteButton) {
        quoteButton.addEventListener('click', function() {
            if (typeof trackEvent === 'function') {
                trackEvent('get_quote_click', {
                    location: 'hero_section'
                });
            }
        });
    }

    // Hero section video handling - optimized for performance
    const setupHeroVideo = function() {
        const heroVideo = document.getElementById('hero-video');

        if (!heroVideo) return; // Exit if the video doesn't exist

        // Video name for tracking
        const videoName = 'output_web_optimized';

        // Add error handling for the video
        heroVideo.addEventListener('error', function(e) {
            console.error('Video error:', heroVideo.id, e);
            // Show poster image as fallback
            heroVideo.poster = "info/Screenshot 2568-07-04 at 23.59.21.png";
        });

        // Function to play the hero video
        const playHeroVideo = function() {
            // Only play if video is visible and not already playing
            if (heroVideo.paused) {
                console.log('Playing hero video');

                // Play the video with error handling
                heroVideo.play().catch(e => {
                    console.error('Error playing hero video:', e);
                });

                // Track video play event
                if (typeof trackEvent === 'function') {
                    trackEvent('hero_video_play', {
                        video_name: videoName
                    });
                }
            }
        };

        // Check network connection and adjust video loading strategy
        const checkNetworkAndLoadVideo = () => {
            // Check if the Network Information API is available
            if ('connection' in navigator) {
                const connection = navigator.connection;

                // Get connection type and effective type
                const connectionType = connection.type;
                const effectiveType = connection.effectiveType;

                console.log(`Network connection: ${connectionType}, effective type: ${effectiveType}`);

                // For slow connections, don't autoplay video to save data
                if (connectionType === 'cellular' || 
                    effectiveType === 'slow-2g' || 
                    effectiveType === '2g' || 
                    effectiveType === '3g') {

                    console.log('Slow connection detected, disabling video autoplay');
                    return false;
                }
            }

            // Check if we're on a device that should autoplay video
            return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || 
                   (window.matchMedia('(min-width: 768px)').matches);
        };

        // Use Intersection Observer to load and play video only when visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When video is visible in the viewport
                if (entry.isIntersecting) {
                    // Check network and device capabilities
                    const shouldAutoplay = checkNetworkAndLoadVideo();

                    // For mobile devices or slow connections, we'll keep preload as metadata to save data
                    // For desktop with good connection, we'll load the video when it's visible
                    if (shouldAutoplay) {
                        // Start loading the video
                        heroVideo.load();

                        // Add loadeddata event listener to play when loaded
                        heroVideo.addEventListener('loadeddata', function onceLoaded() {
                            console.log(`Video (${videoName}) loaded successfully`);
                            playHeroVideo();
                            // Remove the event listener to prevent multiple calls
                            heroVideo.removeEventListener('loadeddata', onceLoaded);
                        });
                    }

                    // Stop observing once we've started loading
                    videoObserver.unobserve(heroVideo);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1 // 10% of the video is visible
        });

        // Track user engagement to determine when to load the video
        let userHasEngaged = false;

        // Function to handle user engagement
        const handleUserEngagement = () => {
            if (!userHasEngaged) {
                userHasEngaged = true;
                console.log('User has engaged with the site, starting video observation');

                // Start observing the video element once user has engaged
                videoObserver.observe(heroVideo);

                // Remove the engagement listeners once triggered
                window.removeEventListener('scroll', handleUserEngagement);
                document.removeEventListener('click', handleUserEngagement);
                document.removeEventListener('keydown', handleUserEngagement);
            }
        };

        // Listen for user engagement events
        window.addEventListener('scroll', handleUserEngagement);
        document.addEventListener('click', handleUserEngagement);
        document.addEventListener('keydown', handleUserEngagement);

        // Set a timeout to load the video anyway after a delay if no engagement
        // This ensures the video will eventually load even without interaction
        setTimeout(() => {
            if (!userHasEngaged) {
                console.log('Loading video after timeout without user engagement');
                handleUserEngagement();
            }
        }, 3000); // 3 second delay

        // Also handle video loading on page load for browsers that don't support IntersectionObserver
        window.addEventListener('load', function() {
            // If IntersectionObserver is not supported
            if (!('IntersectionObserver' in window)) {
                console.log('Page loaded, loading hero video (fallback method)...');

                // Check if the video is in the viewport
                const rect = heroVideo.getBoundingClientRect();
                const isInViewport = (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );

                if (isInViewport) {
                    // Wait for user engagement or timeout before loading
                    if (userHasEngaged) {
                        // If the video is already loaded, play it
                        if (heroVideo.readyState >= 3) { // HAVE_FUTURE_DATA or higher
                            console.log('Hero video already loaded, starting playback');
                            playHeroVideo();
                        } else {
                            // Otherwise load it first
                            heroVideo.load();
                            heroVideo.addEventListener('loadeddata', playHeroVideo);
                        }
                    }
                }
            }
        });
    };

    // Initialize hero video
    setupHeroVideo();

    // DOM Elements
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const quoteForm = document.getElementById('quote-form');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    // Current language (default: English)
    let currentLanguage = localStorage.getItem('language') || 'en';

    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpening = nav.style.display !== 'block';
            nav.style.display = isOpening ? 'block' : 'none';

            // Track mobile menu toggle event
            if (typeof trackEvent === 'function') {
                trackEvent('mobile_menu_toggle', {
                    action: isOpening ? 'open' : 'close'
                });
            }

            // Add mobile-specific styles when menu is open
            if (nav.style.display === 'block') {
                nav.classList.add('mobile-nav-open');
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = '#fff';
                nav.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                nav.style.padding = '15px 0';
                nav.style.zIndex = '1000';

                // Make menu items stack vertically
                const navUl = nav.querySelector('ul');
                if (navUl) {
                    navUl.style.flexDirection = 'column';
                    navUl.style.alignItems = 'center';

                    // Style individual menu items
                    const navItems = navUl.querySelectorAll('li');
                    navItems.forEach(item => {
                        item.style.margin = '8px 0';
                        item.style.width = '100%';
                        item.style.textAlign = 'center';
                    });
                }
            } else {
                nav.classList.remove('mobile-nav-open');
                // Reset styles when menu is closed
                const navUl = nav.querySelector('ul');
                if (navUl) {
                    navUl.style.flexDirection = '';
                    navUl.style.alignItems = '';

                    const navItems = navUl.querySelectorAll('li');
                    navItems.forEach(item => {
                        item.style.margin = '';
                        item.style.width = '';
                        item.style.textAlign = '';
                    });
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('mobile-nav-open') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            nav.style.display = 'none';
            nav.classList.remove('mobile-nav-open');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // Track navigation click event
            if (typeof trackEvent === 'function') {
                trackEvent('navigation_click', {
                    target_section: targetId.replace('#', ''),
                    link_text: this.textContent.trim()
                });
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Enhanced form validation with security measures
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const serviceElement = document.getElementById('service');
            const service = serviceElement.value;
            const serviceText = serviceElement.options[serviceElement.selectedIndex].text;
            const message = document.getElementById('message').value.trim();

            // Required fields validation
            if (name === '' || email === '' || service === '') {
                alert(translations.contact.form.validation.required[currentLanguage]);
                return;
            }

            // Name validation - prevent HTML/script injection
            const nameRegex = /^[A-Za-z\s\-'.]{2,50}$/;
            if (!nameRegex.test(name)) {
                alert("Please enter a valid name (2-50 characters, letters, spaces, and basic punctuation only).");
                return;
            }

            // Email validation - more comprehensive
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!emailRegex.test(email)) {
                alert(translations.contact.form.validation.email[currentLanguage]);
                return;
            }

            // Phone validation - allow international formats
            if (phone && !/^[+\d\s\-()]{7,20}$/.test(phone)) {
                alert("Please enter a valid phone number.");
                return;
            }

            // Message validation - prevent excessive length and script injection
            if (message && (message.length > 1000 || /<script|<\/script|javascript:/i.test(message))) {
                alert("Please enter a valid message (max 1000 characters, no scripts).");
                return;
            }

            // Rate limiting - check if form was submitted recently
            const lastSubmission = localStorage.getItem('lastFormSubmission');
            const now = Date.now();
            if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) { // 1 minute
                alert("Please wait a moment before submitting again.");
                return;
            }

            // Show loading state
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = translations.contact.form.sending[currentLanguage];

            // Track form submission event
            if (typeof trackEvent === 'function') {
                trackEvent('quote_form_submit', {
                    form_id: 'quote-form',
                    form_name: 'Request a Quote',
                    service_type: serviceText
                });
            }

            // Helper function to sanitize text for XSS prevention
            const sanitizeText = (text) => {
                return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            };

            // Prepare template parameters for EmailJS with sanitization
            const templateParams = {
                from_name: sanitizeText(name),
                from_email: sanitizeText(email),
                from_phone: sanitizeText(phone),
                service_type: sanitizeText(serviceText),
                message: sanitizeText(`${name} \n (${email} \n ${phone}) \n- ${serviceText} \n- ${message}`),
                title: sanitizeText(`New Service Request: ${serviceText}`),
                name: sanitizeText(name),
                email: sanitizeText(email),
                phone: sanitizeText(phone),
                service: sanitizeText(serviceText)
            };

            // Check if we're in a production environment
            const isProduction = window.location.hostname === 'jotransportation.com' || 
                                window.location.hostname === 'www.jotransportation.com';

            // EmailJS service and template IDs
            const serviceID = 'service_capnnnq';
            const templateID = 'template_g5oqsya';

            // Only send emails in production or on localhost for testing
            if (isProduction || window.location.hostname === 'localhost') {
                // Send email using EmailJS
                emailjs.send(serviceID, templateID, templateParams)
                    .then(function(response) {
                        // Record successful submission time for rate limiting
                        localStorage.setItem('lastFormSubmission', Date.now().toString());

                        // Show success message with a more modern approach and safe HTML
                        const formContainer = quoteForm.parentElement;
                        formContainer.innerHTML = `
                            <div class="success-message" style="text-align: center; padding: 40px 20px;">
                                <i class="fas fa-check-circle" style="font-size: 60px; color: var(--primary-color); margin-bottom: 20px;"></i>
                                <h3 style="margin-bottom: 15px; color: var(--secondary-color);">${translations.contact.form.success.title[currentLanguage]}</h3>
                                <p style="margin-bottom: 25px; color: var(--text-light);">${translations.contact.form.success.message[currentLanguage]}</p>
                                <button onclick="location.reload()" class="btn">${translations.contact.form.success.button[currentLanguage]}</button>
                            </div>
                        `;
                    })
                    .catch(function(error) {
                        // Handle error without logging sensitive information
                        alert(translations.contact.form.validation.error[currentLanguage]);

                        // Reset button state
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    });
            } else {
                // In development environments, simulate success without sending actual emails
                setTimeout(() => {
                    // Show success message
                    const formContainer = quoteForm.parentElement;
                    formContainer.innerHTML = `
                        <div class="success-message" style="text-align: center; padding: 40px 20px;">
                            <i class="fas fa-check-circle" style="font-size: 60px; color: var(--primary-color); margin-bottom: 20px;"></i>
                            <h3 style="margin-bottom: 15px; color: var(--secondary-color);">${translations.contact.form.success.title[currentLanguage]}</h3>
                            <p style="margin-bottom: 25px; color: var(--text-light);">${translations.contact.form.success.message[currentLanguage]}</p>
                            <button onclick="location.reload()" class="btn">${translations.contact.form.success.button[currentLanguage]}</button>
                        </div>
                    `;
                }, 1000);
            }
        });
    }

    // Add active class to navigation links based on scroll position
    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add scroll effect to header
    function handleScroll() {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Navigation highlighting
        highlightNavLink();
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);

    // Initialize
    handleScroll(); // Run once on page load

    // Reveal animations for sections - updated for Tailwind
    // Now targeting elements by their structure since we've converted to Tailwind classes
    const revealElements = document.querySelectorAll('.services .bg-white, .py-28.bg-white .bg-white, .contact .flex.items-start');

    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add scroll event for reveal animations
    window.addEventListener('scroll', revealOnScroll);

    // Run once on page load
    revealOnScroll();

    // Language switcher functionality
    function changeLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);

        // Handle RTL for Arabic
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        // Add or remove RTL-specific classes
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }

        // Track language change event
        if (typeof trackEvent === 'function') {
            trackEvent('language_change', {
                language: lang
            });
        }

        // Update all translatable elements
        updatePageContent();
    }

    // Function to update all text content on the page
    function updatePageContent() {
        // Update navigation links
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');

            // Navigate through the translations object to find the right translation
            let translation = translations;
            for (const k of keys) {
                if (translation[k]) {
                    translation = translation[k];
                } else {
                    console.warn(`Translation key not found: ${key}`);
                    return;
                }
            }

            // Apply the translation if found
            if (translation[currentLanguage]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.getAttribute('placeholder')) {
                        element.setAttribute('placeholder', translation[currentLanguage]);
                    } else {
                        element.value = translation[currentLanguage];
                    }
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation[currentLanguage];
                } else {
                    element.textContent = translation[currentLanguage];
                }
            }
        });

        // Update form validation messages
        if (quoteForm) {
            const submitButton = quoteForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = translations.contact.form.submit[currentLanguage];
            }
        }
    }

    // Initialize language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            changeLanguage(this.value);
        });

        // Set initial value
        languageSelector.value = currentLanguage;
    }

    // Initialize language with saved preference or default
    changeLanguage(currentLanguage);

    // Track social media link clicks
    document.querySelectorAll('footer .flex.gap-4 a').forEach(link => {
        link.addEventListener('click', function(e) {
            const socialPlatform = this.querySelector('i').className.replace('fab fa-', '').replace('-f', '').replace('-in', '');

            if (typeof trackEvent === 'function') {
                trackEvent('social_media_click', {
                    platform: socialPlatform
                });
            }
        });
    });

    // Track service selection in the contact form
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value && selectedOption.value !== '' && typeof trackEvent === 'function') {
                trackEvent('service_selection', {
                    service_type: selectedOption.value,
                    service_name: selectedOption.textContent
                });
            }
        });
    }

    // Track contact information link clicks
    const contactLinks = {
        'tel:': 'phone_call',
        'mailto:': 'email_click',
        'line.me': 'line_click',
        'wa.me': 'whatsapp_click'
    };

    document.querySelectorAll('#contact a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            let eventType = null;
            let contactMethod = null;

            for (const [prefix, event] of Object.entries(contactLinks)) {
                if (href.includes(prefix)) {
                    eventType = event;
                    contactMethod = href.replace(prefix, '');
                    break;
                }
            }

            if (eventType && typeof trackEvent === 'function') {
                trackEvent('contact_method_click', {
                    method: eventType,
                    value: contactMethod
                });
            }
        });
    });
});
