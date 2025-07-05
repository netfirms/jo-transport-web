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

    // DOM Elements
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const quoteForm = document.getElementById('quote-form');

    // Current language (default: English)
    let currentLanguage = localStorage.getItem('language') || 'en';

    // Mobile Menu Toggle - Removed as per requirements

    // Close mobile menu when clicking outside - Removed as per requirements

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

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
            const service = document.getElementById('service').value;
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

            // Prepare template parameters for EmailJS
            // These parameter names should match the template variables in your EmailJS template
            const templateParams = {
                from_name: name,
                from_email: email,
                from_phone: phone,
                service_type: service,
                message: `${name} \n (${email} \n ${phone}) \n- ${service} \n- ${message}`,
                title: `New Service Request: ${service} `,
                name: name,
                email: email,
                phone: phone,
                service: service
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
});
