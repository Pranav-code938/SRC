// Mobile-first SRC Robotics Competition Website - Fixed Version
// Cyberpunk themed with loading animations and smooth interactions

class SRCWebsite {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.typingTexts = [
            'INITIALIZING SYSTEMS...',
            'LOADING ROBOTICS DATA...',
            'CONNECTING TO SRC...',
            'WELCOME TO THE FUTURE'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        
        this.init();
    }

    init() {
        console.log('Initializing SRC Website...');
        this.bindEvents();
        this.startLoadingAnimation();
        this.setupIntersectionObserver();
        this.initializeNavigation();
    }

    bindEvents() {
        // Loading completion
        window.addEventListener('load', () => {
            setTimeout(() => this.hideLoadingScreen(), 2000);
        });

        // Bottom navigation - specific event handlers
        this.setupBottomNavigation();
        
        // Hamburger menu - specific event handlers
        this.setupHamburgerMenu();
        
        // Register buttons - ensure external links work
        this.setupRegisterButtons();

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

        // Touch events for mobile
        this.setupTouchEvents();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Button hover effects
        this.setupButtonEffects();
    }

    setupBottomNavigation() {
        const navItems = document.querySelectorAll('.bottom-nav .nav-item');
        console.log('Found nav items:', navItems.length);
        
        navItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const sectionId = item.getAttribute('data-section') || item.getAttribute('href')?.substring(1);
                console.log('Nav item clicked:', sectionId);
                
                if (sectionId) {
                    this.navigateToSection(sectionId);
                    this.updateActiveNavigation(sectionId);
                    this.addCyberEffect(item);
                }
            });

            // Add touch feedback
            item.addEventListener('touchstart', (e) => {
                item.style.transform = 'scale(0.95)';
                item.style.background = 'rgba(0, 255, 255, 0.2)';
            }, { passive: true });

            item.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    item.style.transform = '';
                    if (!item.classList.contains('active')) {
                        item.style.background = '';
                    }
                }, 150);
            }, { passive: true });
        });
    }

    setupHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        
        console.log('Hamburger elements:', hamburger, hamburgerMenu);
        
        if (hamburger && hamburgerMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Hamburger clicked');
                this.toggleHamburgerMenu();
            });

            // Menu item navigation
            const menuItems = hamburgerMenu.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const sectionId = item.getAttribute('href')?.substring(1);
                    if (sectionId) {
                        console.log('Menu item clicked:', sectionId);
                        this.navigateToSection(sectionId);
                        this.closeHamburgerMenu();
                        this.addCyberEffect(item);
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (hamburgerMenu.classList.contains('active') && 
                    !hamburger.contains(e.target) && 
                    !hamburgerMenu.contains(e.target)) {
                    this.closeHamburgerMenu();
                }
            });
        }
    }

    setupRegisterButtons() {
        const registerButtons = document.querySelectorAll('.btn-register, .btn-rulebook, .register-btn-top');
        console.log('Found register buttons:', registerButtons.length);
        
        registerButtons.forEach(button => {
            // Ensure target="_blank" is set
            if (button.tagName === 'A' && button.href) {
                button.setAttribute('target', '_blank');
                button.setAttribute('rel', 'noopener noreferrer');
                
                button.addEventListener('click', (e) => {
                    // Add visual feedback
                    this.createRippleEffect(e, button);
                    this.addCyberEffect(button);
                    
                    // Brief delay to show effect before navigation
                    setTimeout(() => {
                        console.log('Opening external link:', button.href);
                    }, 100);
                });
            }
        });

        // Handle top register button
        const topRegisterBtn = document.querySelector('.register-btn-top');
        if (topRegisterBtn) {
            topRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Scroll to events section
                this.navigateToSection('events');
                this.addCyberEffect(topRegisterBtn);
            });
        }
    }

    startLoadingAnimation() {
        const typingElement = document.getElementById('typingText');
        const progressBar = document.getElementById('progressBar');
        
        if (!typingElement || !progressBar) {
            console.log('Loading elements not found');
            return;
        }

        console.log('Starting loading animation');
        
        // Start typing animation
        this.typeText(typingElement);
        
        // Start progress bar
        this.animateProgressBar(progressBar);
        
        // Add glitch effects to loading screen
        this.addLoadingGlitchEffects();
    }

    typeText(element) {
        if (!this.isLoading) return;
        
        const currentText = this.typingTexts[this.currentTextIndex];
        
        if (this.currentCharIndex < currentText.length) {
            element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            setTimeout(() => this.typeText(element), 50 + Math.random() * 50);
        } else {
            setTimeout(() => {
                this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                this.currentCharIndex = 0;
                element.textContent = '';
                if (this.isLoading) {
                    setTimeout(() => this.typeText(element), 500);
                }
            }, 1000);
        }
    }

    animateProgressBar(progressBar) {
        let progress = 0;
        const increment = 2 + Math.random() * 3;
        
        const animate = () => {
            if (progress < 100 && this.isLoading) {
                progress += increment;
                progressBar.style.width = Math.min(progress, 100) + '%';
                setTimeout(animate, 100 + Math.random() * 100);
            }
        };
        
        animate();
    }

    addLoadingGlitchEffects() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        const glitchInterval = setInterval(() => {
            if (this.isLoading && loadingScreen) {
                loadingScreen.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
                setTimeout(() => {
                    if (loadingScreen) {
                        loadingScreen.style.filter = 'none';
                    }
                }, 100);
            } else {
                clearInterval(glitchInterval);
            }
        }, 2000);
    }

    hideLoadingScreen() {
        console.log('Hiding loading screen');
        this.isLoading = false;
        const loadingScreen = document.getElementById('loadingScreen');
        
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }

        // Start main animations
        this.startMainAnimations();
        
        // Initialize background video
        this.initializeBackgroundVideo();
    }

    initializeBackgroundVideo() {
        console.log('Initializing background video');
        const videoContainer = document.querySelector('.background-video');
        
        if (videoContainer) {
            const iframe = videoContainer.querySelector('iframe');
            if (iframe) {
                // Ensure iframe is properly loaded
                iframe.onload = () => {
                    console.log('Background video loaded');
                    videoContainer.style.opacity = '1';
                };
                
                // Force reload if needed
                setTimeout(() => {
                    const src = iframe.src;
                    iframe.src = src;
                }, 1000);
            }
        }
    }

    startMainAnimations() {
        console.log('Starting main animations');
        
        // Animate in main content
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                section.style.animation = 'fadeInUp 0.8s ease forwards';
            }, index * 200);
        });

        // Start continuous animations
        this.startContinuousAnimations();
    }

    startContinuousAnimations() {
        // Logo glow animation
        const logos = document.querySelectorAll('.nav-logo, .sponsor-logo');
        setInterval(() => {
            logos.forEach(logo => {
                if (logo) {
                    logo.style.filter = `drop-shadow(0 0 ${10 + Math.random() * 10}px #00ffff)`;
                }
            });
        }, 2000);

        // Random glitch effects
        setInterval(() => {
            const glitchElements = document.querySelectorAll('.main-title, .section-title');
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            
            if (randomElement) {
                randomElement.style.animation = 'glitch 0.3s ease';
                setTimeout(() => {
                    randomElement.style.animation = '';
                }, 300);
            }
        }, 8000);
    }

    toggleHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        
        if (hamburger && hamburgerMenu) {
            const isActive = hamburger.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            
            console.log('Hamburger menu toggled:', isActive);
            
            // Add cyberpunk sound effect (visual feedback)
            this.addCyberEffect(hamburger);
            
            // Add body class to prevent scrolling when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    closeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        
        if (hamburger && hamburgerMenu) {
            hamburger.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Hamburger menu closed');
        }
    }

    navigateToSection(sectionId) {
        console.log('Navigating to section:', sectionId);
        const section = document.getElementById(sectionId);
        
        if (section) {
            // Smooth scroll to section
            const topOffset = 60; // Account for fixed header
            const sectionTop = section.offsetTop - topOffset;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });

            // Update active states
            this.updateActiveNavigation(sectionId);
            this.currentSection = sectionId;
            
            // Update URL hash without triggering scroll
            history.replaceState(null, null, `#${sectionId}`);
        }
    }

    updateActiveNavigation(activeSection) {
        console.log('Updating active navigation:', activeSection);
        
        // Update bottom navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const section = item.getAttribute('data-section');
            if (section === activeSection) {
                item.classList.add('active');
                item.style.background = 'rgba(0, 255, 255, 0.15)';
            } else {
                item.classList.remove('active');
                item.style.background = '';
            }
        });
    }

    handleScroll() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 150; // Increased offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                if (this.currentSection !== sectionId) {
                    this.updateActiveNavigation(sectionId);
                    this.currentSection = sectionId;
                }
            }
        });
    }

    setupTouchEvents() {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.btn, .nav-item, .menu-item, .event-card, .hamburger');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                element.style.transform = 'scale(0.95)';
                this.addCyberEffect(element);
            }, { passive: true });
            
            element.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            }, { passive: true });
        });

        // Swipe gestures for section navigation
        let startY = 0;
        let isScrolling = false;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            isScrolling = true;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (isScrolling) return; // Don't trigger if user was scrolling
            
            const endY = e.changedTouches[0].clientY;
            const diffY = startY - endY;

            // Vertical swipe for section navigation (only if significant swipe)
            if (Math.abs(diffY) > 100) {
                const sections = ['home', 'events', 'timeline', 'about', 'contact'];
                const currentIndex = sections.indexOf(this.currentSection);
                
                if (diffY > 0 && currentIndex < sections.length - 1) {
                    // Swipe up - next section
                    this.navigateToSection(sections[currentIndex + 1]);
                } else if (diffY < 0 && currentIndex > 0) {
                    // Swipe down - previous section
                    this.navigateToSection(sections[currentIndex - 1]);
                }
            }
        }, { passive: true });
    }

    handleKeyboard(e) {
        // Keyboard navigation
        const sections = ['home', 'events', 'timeline', 'about', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (currentIndex < sections.length - 1) {
                    this.navigateToSection(sections[currentIndex + 1]);
                }
                break;
                
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    this.navigateToSection(sections[currentIndex - 1]);
                }
                break;
                
            case 'Home':
                e.preventDefault();
                this.navigateToSection('home');
                break;
                
            case 'End':
                e.preventDefault();
                this.navigateToSection('contact');
                break;
                
            case 'Escape':
                this.closeHamburgerMenu();
                break;
        }
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn, .register-btn-top, .hamburger');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addCyberGlow(button);
            });
            
            button.addEventListener('mouseleave', () => {
                this.removeCyberGlow(button);
            });
            
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    addCyberEffect(element) {
        if (element) {
            element.style.textShadow = '0 0 10px #00ffff, 0 0 20px #00ffff';
            element.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.6)';
            setTimeout(() => {
                element.style.textShadow = '';
                if (!element.classList.contains('active')) {
                    element.style.boxShadow = '';
                }
            }, 500);
        }
    }

    addCyberGlow(element) {
        if (element) {
            element.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.8)';
            element.style.transform = 'translateY(-2px)';
        }
    }

    removeCyberGlow(element) {
        if (element && !element.classList.contains('active')) {
            element.style.boxShadow = '';
            element.style.transform = '';
        }
    }

    createRippleEffect(e, element) {
        if (!element) return;
        
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 1000;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.event-card, .timeline-day, .value-item, .contact-card');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                            child.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('.section, .event-card, .timeline-day, .value-item, .contact-card')
            .forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
    }

    initializeNavigation() {
        // Set initial active state
        this.updateActiveNavigation('home');
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const hash = window.location.hash.substring(1) || 'home';
            this.navigateToSection(hash);
        });

        // Handle direct hash links
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            setTimeout(() => {
                this.navigateToSection(hash);
            }, 2500); // After loading screen
        }
    }
}

// Additional utility functions and optimizations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes neonFlicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.9; }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .cyber-glow {
            animation: neonFlicker 3s infinite;
        }
        
        /* Improve scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(10, 15, 28, 0.8);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #00ffff, #00d4ff);
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        
        /* Selection colors */
        ::selection {
            background: rgba(0, 255, 255, 0.3);
            color: #ffffff;
        }
        
        /* Force background video visibility */
        .background-video {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .background-video iframe {
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing SRC website...');
    
    // Add dynamic styles immediately
    addDynamicStyles();
    
    // Setup image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            this.style.opacity = '0.3';
            this.alt = 'Image failed to load';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Initialize main website class
    window.srcWebsite = new SRCWebsite();
    
    console.log('🤖 SRC Robotics Competition website initialized!');
    console.log('💫 Cyberpunk mode: ACTIVATED');
});

// Handle page visibility changes for mobile optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// Export for debugging
window.SRCWebsite = SRCWebsite;