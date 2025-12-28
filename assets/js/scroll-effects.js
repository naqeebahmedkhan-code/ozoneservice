// Scroll Effects & Animations for Ozone Service Solutions

class ScrollEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize all scroll effects
        this.setupScrollAnimation();
        this.setupParallax();
        this.setupScrollProgress();
        this.setupBackToTop();
        this.setupNavbarEffects();
        this.setupStickyElements();
        
        // Initial check
        this.checkScrollPosition();
        
        // Throttle scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.checkScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.checkScrollPosition();
        });
    }
    
    setupScrollAnimation() {
        // Create Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add visible class based on animation type
                    if (element.classList.contains('fade-in')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('slide-in-left')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('slide-in-right')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('scale-in')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('rotate-in')) {
                        element.classList.add('visible');
                    }
                    
                    // Stop observing after animation
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in').forEach(element => {
            observer.observe(element);
        });
    }
    
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;
        
        const updateParallax = () => {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollPosition * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        };
        
        window.addEventListener('scroll', updateParallax);
        updateParallax();
    }
    
    setupScrollProgress() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        // Update progress bar
        const updateProgressBar = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        };
        
        window.addEventListener('scroll', updateProgressBar);
        updateProgressBar();
    }
    
    setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility();
    }
    
    setupNavbarEffects() {
        const navbar = document.querySelector('.nav-container');
        if (!navbar) return;
        
        const toggleNavbarBackground = () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', toggleNavbarBackground);
        toggleNavbarBackground();
    }
    
    setupStickyElements() {
        // Handle sticky elements on scroll
        const stickyElements = document.querySelectorAll('[data-sticky]');
        
        if (stickyElements.length === 0) return;
        
        const updateStickyElements = () => {
            stickyElements.forEach(element => {
                const offset = element.dataset.stickyOffset || 100;
                const shouldBeSticky = window.pageYOffset > offset;
                
                if (shouldBeSticky) {
                    element.classList.add('sticky-active');
                } else {
                    element.classList.remove('sticky-active');
                }
            });
        };
        
        window.addEventListener('scroll', updateStickyElements);
        updateStickyElements();
    }
    
    checkScrollPosition() {
        // Check for elements in viewport
        const elements = document.querySelectorAll('.scroll-check');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isInViewport) {
                element.classList.add('in-viewport');
            } else {
                element.classList.remove('in-viewport');
            }
        });
    }
    
    // Smooth scroll to anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80; // Account for fixed navbar
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Lazy loading for images
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
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
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    // Add scroll-based class toggles
    setupScrollClasses() {
        const sections = document.querySelectorAll('section[id]');
        
        const highlightNavOnScroll = () => {
            let scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.add('active');
                } else {
                    document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.remove('active');
                }
            });
        };
        
        window.addEventListener('scroll', highlightNavOnScroll);
        highlightNavOnScroll();
    }
    
    // Initialize all effects
    initializeAll() {
        this.setupScrollAnimation();
        this.setupParallax();
        this.setupScrollProgress();
        this.setupBackToTop();
        this.setupNavbarEffects();
        this.setupStickyElements();
        this.setupSmoothScroll();
        this.setupLazyLoading();
        this.setupScrollClasses();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const scrollEffects = new ScrollEffects();
    scrollEffects.initializeAll();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollEffects;
}