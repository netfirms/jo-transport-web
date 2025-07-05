document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    // To set up EmailJS:
    // 1. Create an account at https://www.emailjs.com/
    // 2. Create an Email Service (e.g., Gmail, Outlook, etc.)
    // 3. Create an Email Template with template variables: {{from_name}}, {{from_email}}, {{from_phone}}, {{service_type}}, {{message}}
    // 4. Get your EmailJS Public Key, Service ID, and Template ID from the EmailJS dashboard
    // 5. Replace the placeholders below with your actual values
    (function() {
        // Replace with your actual EmailJS public key
        emailjs.init("44SbPdv3lcp7pJ3VE");
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

    // Hero section video handling
    const setupHeroVideos = function() {
        const video1 = document.getElementById('hero-video-1');
        const video2 = document.getElementById('hero-video-2');
        const video3 = document.getElementById('hero-video-3');

        if (!video1 || !video2 || !video3) return; // Exit if videos don't exist

        // Track current active video (1, 2, or 3)
        let currentVideo = 1;

        // Function to switch between videos
        const switchVideos = function() {
            // Hide all videos first
            video1.classList.add('hidden');
            video2.classList.add('hidden');
            video3.classList.add('hidden');

            // Determine next video to show
            currentVideo = (currentVideo % 3) + 1; // Cycle through 1, 2, 3

            // Show and play the next video
            let videoName = '';
            if (currentVideo === 1) {
                video1.classList.remove('hidden');
                video1.currentTime = 0;
                video1.play();
                videoName = 'Airport_Services_Video';
            } else if (currentVideo === 2) {
                video2.classList.remove('hidden');
                video2.currentTime = 0;
                video2.play();
                videoName = 'Airport_Transportation_Video';
            } else { // currentVideo === 3
                video3.classList.remove('hidden');
                video3.currentTime = 0;
                video3.play();
                videoName = 'Video_Prompt_for_Airport_Services';
            }

            // Track video switch event
            if (typeof trackEvent === 'function') {
                trackEvent('hero_video_switch', {
                    video_number: currentVideo,
                    video_name: videoName
                });
            }
        };

        // Listen for the end of each video
        video1.addEventListener('ended', switchVideos);
        video2.addEventListener('ended', switchVideos);
        video3.addEventListener('ended', switchVideos);
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

            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const serviceElement = document.getElementById('service');
            const service = serviceElement.value;
            const serviceText = serviceElement.options[serviceElement.selectedIndex].text;
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || service === '') {
                alert(translations.contact.form.validation.required[currentLanguage]);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(translations.contact.form.validation.email[currentLanguage]);
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

            // Prepare template parameters for EmailJS
            // These parameter names should match the template variables in your EmailJS template
            const templateParams = {
                from_name: name,
                from_email: email,
                from_phone: phone,
                service_type: serviceText,
                message: `${name} \n (${email} \n ${phone}) \n- ${serviceText} \n- ${message}`,
                title: `New Service Request: ${serviceText} `,
                name: name,
                email: email,
                phone: phone,
                service: serviceText
            };

            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' with your actual EmailJS service ID (e.g., 'gmail')
            // Replace 'YOUR_TEMPLATE_ID' with your actual EmailJS template ID (e.g., 'template_abc123')
            emailjs.send('service_capnnnq', 'template_g5oqsya', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Show success message with a more modern approach
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
                    console.log('FAILED...', error);
                    alert(translations.contact.form.validation.error[currentLanguage]);

                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });
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
