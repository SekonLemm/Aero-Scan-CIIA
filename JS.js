/**
 * ============================================
 * AEROSCAN - JAVASCRIPT
 * AI-Powered Environmental Surveillance
 * ============================================
 */

'use strict';

/**
 * ============================================
 * SMOOTH SCROLLING NAVIGATION
 * ============================================
 */

/**
 * Enables smooth scrolling for anchor links
 * @param {Event} e - Click event
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * ============================================
 * SCROLL REVEAL ANIMATIONS
 * ============================================
 */

/**
 * Reveals elements on scroll when they enter viewport
 */
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

/**
 * ============================================
 * ANIMATED COUNTER
 * ============================================
 */

/**
 * Animates a number counter from 0 to target value
 * @param {HTMLElement} element - The element to animate
 * @param {number} target - The target number to count to
 */
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

/**
 * ============================================
 * STATS SECTION OBSERVER
 * ============================================
 */

/**
 * Triggers counter animation when stats section becomes visible
 */
function initStatsObserver() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/,/g, ''));
                    stat.textContent = '0';
                    animateCounter(stat, target);
                });
                
                // Unobserve after animation to prevent re-triggering
                statsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5 // Trigger when 50% of element is visible
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

/**
 * ============================================
 * MOBILE NAVIGATION TOGGLE
 * ============================================
 */

/**
 * Handles mobile navigation menu toggle
 * (Can be expanded for hamburger menu functionality)
 */
function initMobileNavigation() {
    // Placeholder for mobile menu toggle functionality
    // Implement hamburger menu if needed
    
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    // Hide/show nav on scroll (optional enhancement)
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, false);
}

/**
 * ============================================
 * PERFORMANCE OPTIMIZATION
 * ============================================
 */

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * ============================================
 * LAZY LOADING IMAGES
 * ============================================
 */

/**
 * Implements lazy loading for images
 * (Can be used when images are added to the site)
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * ============================================
 * ACTIVE NAVIGATION LINK
 * ============================================
 */

/**
 * Highlights the active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/**
 * ============================================
 * INITIALIZATION
 * ============================================
 */

/**
 * Initialize all functions when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scroll reveal animations
    window.addEventListener('scroll', debounce(revealOnScroll, 10));
    revealOnScroll(); // Initial check on page load
    
    // Initialize stats counter observer
    initStatsObserver();
    
    // Initialize mobile navigation
    // initMobileNavigation(); // Uncomment if needed
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavLink, 10));
    
    console.log('AeroScan: All systems initialized successfully ✅');
});

/**
 * ============================================
 * WINDOW LOAD EVENT
 * ============================================
 */

/**
 * Execute after all resources are loaded
 */
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    console.log('AeroScan: Page fully loaded 🚀');
});

/**
 * ============================================
 * PERFORMANCE MONITORING (Optional)
 * ============================================
 */

/**
 * Log performance metrics in development
 */
if (window.performance && window.console) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    window.addEventListener('load', () => {
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
}