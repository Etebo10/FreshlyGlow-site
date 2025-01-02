// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loader after page load
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn') && 
            navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Stats animation
    const statsSection = document.querySelector('.stats');
    let animationTriggered = false;

    const animateStats = () => {
        if (animationTriggered) return;

        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // Animation duration in milliseconds
            const steps = 50; // Number of steps in animation
            const increment = target / steps;
            let current = 0;
            let step = 0;

            const updateStat = () => {
                step++;
                current = Math.min(target, Math.ceil(increment * step));
                stat.textContent = current;
                
                if (step < steps && current < target) {
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };

            requestAnimationFrame(updateStat);
        });

        animationTriggered = true;
    };

    // Intersection Observer for stats animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add to cart functionality
    document.querySelectorAll('.button').forEach(button => {
        if (button.textContent === 'Add to Cart 🛍️') {
            button.addEventListener('click', function(e) {
                const originalText = this.textContent;
                this.textContent = 'Added to Cart 🛒!';
                this.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            });
        }
    });
});