// Animation code for services page
document.addEventListener('DOMContentLoaded', function() {
    // Reveal animations for service items
    const serviceItems = document.querySelectorAll('.service-detail-item');

    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a slight delay between each item for a cascade effect
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    
                    // Once the animation is applied, stop observing the element
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1, // trigger when 10% of the item is visible
            rootMargin: '0px 0px -50px 0px' // trigger slightly before the item is in view
        });

        // Observe each service item
        serviceItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        setTimeout(function() {
            serviceItems.forEach((item, index) => {
                setTimeout(function() {
                    item.classList.add('visible');
                }, index * 150);
            });
        }, 300);
    }
});