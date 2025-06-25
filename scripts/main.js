// EcoVert Academy - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('p');
            
            // Toggle visibility
            if (answer.style.display === 'none' || answer.style.display === '') {
                answer.style.display = 'block';
                this.style.backgroundColor = '#1e3a21';
            } else {
                answer.style.display = 'none';
                this.style.backgroundColor = '#2c5530';
            }
        });
    });

    // Initialize FAQ items as closed
    const faqAnswers = document.querySelectorAll('.faq-item p');
    faqAnswers.forEach(answer => {
        answer.style.display = 'none';
    });

    // Form validation and submission
    const contactForm = document.querySelector('.cta-footer form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '#28a745';
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.style.borderColor = '#dc3545';
                }
            }
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('.btn-primary');
                const originalText = submitBtn.textContent;
                
                // Check if page is in Arabic or French for success message
                const isArabic = document.documentElement.getAttribute('dir') === 'rtl';
                const successMessage = isArabic ? 'تم إرسال الرسالة!' : 'Message Envoyé!';
                
                submitBtn.textContent = successMessage;
                submitBtn.style.backgroundColor = '#28a745';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '#d2691e';
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                    });
                }, 2000);
            }
        });
    }

    // Mobile menu toggle (if needed)
    const header = document.querySelector('header');
    if (window.innerWidth <= 768) {
        const nav = header.querySelector('nav');
        const navToggle = document.createElement('button');
        navToggle.innerHTML = '☰';
        navToggle.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        `;
        
        // Insert toggle button
        header.querySelector('.container').insertBefore(navToggle, nav);
        
        // Hide nav by default on mobile
        nav.style.display = 'none';
        
        navToggle.addEventListener('click', function() {
            if (nav.style.display === 'none') {
                nav.style.display = 'block';
                nav.style.width = '100%';
                nav.style.marginTop = '20px';
            } else {
                nav.style.display = 'none';
            }
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service items, benefit items, and testimonials
    const animatedElements = document.querySelectorAll('.service-item, .benefit-item, .testimonial-item, .step-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Language switcher enhancement
    const langSwitcher = document.querySelector('.lang-switcher a');
    if (langSwitcher) {
        langSwitcher.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        langSwitcher.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Service item hover effects
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(210, 105, 30, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

});

// Utility function for smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-item, .benefit-item, .testimonial-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on load
window.addEventListener('load', animateOnScroll);

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    const nav = document.querySelector('nav');
    if (window.innerWidth > 768 && nav) {
        nav.style.display = 'flex';
    }
});
