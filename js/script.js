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

    // Hero section video handling with lazy loading
    const setupHeroVideos = function() {
        const video1 = document.getElementById('hero-video-1');
        const video2 = document.getElementById('hero-video-2');
        const video3 = document.getElementById('hero-video-3');
        const video2Container = document.getElementById('hero-video-2-container');
        const video3Container = document.getElementById('hero-video-3-container');

        if (!video1 || !video2) return; // Exit if videos 1 or 2 don't exist

        // Track current active video (1 or 2)
        let currentVideo = 1;
        let videosInitialized = [true, false]; // Track which videos have been initialized

        // Function to initialize a video that hasn't been loaded yet
        const initializeVideo = function(videoElement) {
            const sourceElement = videoElement.querySelector('source');
            if (sourceElement) {
                // Make sure the video is loaded
                videoElement.load(); // Important: need to call load() to ensure the video is ready

                // Add a one-time event listener to confirm the video is loadable
                videoElement.addEventListener('loadeddata', function onLoaded() {
                    console.log('Video loaded successfully:', videoElement.id);
                    videoElement.removeEventListener('loadeddata', onLoaded);
                });

                return true; // Video was initialized
            }
            return false; // Video initialization failed
        };

        // Function to switch between videos
        const switchVideos = function() {
            console.log('Switching videos. Current video:', currentVideo);

            // Determine next video to show - only cycle between videos 1 and 2
            const nextVideo = currentVideo === 1 ? 2 : 1; // Cycle only through 1 and 2
            console.log('Next video to play:', nextVideo);

            // Initialize the next video if needed
            if (!videosInitialized[nextVideo - 1]) {
                if (nextVideo === 2) {
                    videosInitialized[1] = initializeVideo(video2);
                    console.log('Initialized video 2');
                } else if (nextVideo === 3) {
                    videosInitialized[2] = initializeVideo(video3);
                    console.log('Initialized video 3');
                }
            }

            // Hide all video containers
            video1.parentElement.classList.add('hidden');
            video2Container.classList.add('hidden');
            video3Container.classList.add('hidden');

            // Update current video
            currentVideo = nextVideo;

            // Show and play the next video (only videos 1 and 2)
            let videoName = '';
            if (currentVideo === 1) {
                video1.parentElement.classList.remove('hidden');
                video1.currentTime = 0;
                video1.play().catch(e => console.log('Video play error:', e));
                videoName = 'Airport_Services_Video';
            } else { // currentVideo === 2
                video2Container.classList.remove('hidden');
                video2.currentTime = 0;
                video2.play().catch(e => console.log('Video play error:', e));
                videoName = 'Airport_Transportation_Video';
            }

            // Track video switch event
            if (typeof trackEvent === 'function') {
                trackEvent('hero_video_switch', {
                    video_number: currentVideo,
                    video_name: videoName
                });
            }
        };

        // Listen for the end of videos 1 and 2 to create a loop
        video1.addEventListener('ended', function() {
            console.log('Video 1 ended, switching to video 2');
            switchVideos();
        });

        video2.addEventListener('ended', function() {
            console.log('Video 2 ended, switching back to video 1');
            switchVideos();
        });

        // Add error handling for videos 1 and 2
        [video1, video2].forEach(video => {
            video.addEventListener('error', function(e) {
                console.error('Video error:', video.id, e);
            });
        });

        // Preload videos 1 and 2 after the page has loaded
        window.addEventListener('load', function() {
            // Initialize video 1 (already loaded)
            console.log('Video 1 is ready to play');

            // Make sure video1 is properly loaded
            if (video1.readyState < 2) {
                console.log('Ensuring video 1 is loaded...');
                video1.load();
            }

            // Initialize video 2 immediately
            videosInitialized[1] = initializeVideo(video2);
            console.log('Preloaded second video');

            // Make sure video1 has an ended event by forcing a check
            if (video1.readyState >= 2) {
                console.log('Video 1 is loaded and ready to play');
            } else {
                console.log('Waiting for video 1 to load...');
                video1.addEventListener('loadeddata', function() {
                    console.log('Video 1 loaded data event fired');
                });
            }

            // Force preload of videos 1 and 2 to ensure they're ready
            [video1, video2].forEach(video => {
                if (video.preload !== 'auto') {
                    video.preload = 'auto';
                }
            });
        });
    };

    // Initialize hero videos
    setupHeroVideos();

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
