// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards, case studies, testimonials
document.querySelectorAll('.service-card, .case-study, .testimonial-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Smooth scroll for buttons
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

// Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const businessType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Hi! I'm ${name}.\n\nI'm interested in learning more about your services.\n\nBusiness Type: ${businessType}\n\nMessage: ${message}\n\nEmail: ${email}`;
        
        // You can either:
        // 1. Send via WhatsApp
        const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;
        
        // 2. Or submit to a form backend
        // For now, we'll open WhatsApp
        window.open(whatsappLink, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Thank you for reaching out! We\'ll be in touch within 24 hours.');
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : element.textContent.includes('#') ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : element.textContent.includes('#') ? '' : '+');
        }
    }, 16);
}

// Trigger counter animation when stats are in view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            let target = parseInt(text);
            if (text.includes('%')) {
                target = parseInt(text);
            } else if (text.includes('+')) {
                target = parseInt(text);
            }
            
            animateCounter(statNumber, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orb1 = document.querySelector('.gradient-orb-1');
    const orb2 = document.querySelector('.gradient-orb-2');
    
    if (orb1 && orb2) {
        orb1.style.transform = `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)`;
        orb2.style.transform = `translate(${scrollY * -0.1}px, ${scrollY * -0.1}px)`;
    }
});

// Stagger animation for service cards on page load
window.addEventListener('load', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease-out forwards`;
        }, index * 100);
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Analytics - Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'button_text': btn.textContent,
                'section': btn.closest('section').id || 'unknown'
            });
        }
    });
});

// Dynamic pricing table interaction
document.querySelectorAll('.btn-block').forEach(btn => {
    btn.addEventListener('click', function() {
        const pricingCard = this.closest('.pricing-card');
        const packageName = pricingCard.querySelector('h3').textContent;
        
        // Log the package selection
        console.log('Selected package:', packageName);
        
        // You could redirect to a checkout page or open a modal here
        // window.location.href = `/checkout?package=${packageName}`;
    });
});

// Add smooth loading animation
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Optimize performance - lazy load images if needed in future
if ('IntersectionObserver' in window) {
    // Ready for lazy loading implementation
}

// Mobile responsiveness improvements
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    // Reduce animation complexity on mobile for better performance
    document.documentElement.style.setProperty('--animation-duration', '0.4s');
}

// Print analytics
console.log('%c LS Marketing Agency', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%c Premium Digital Marketing Solutions', 'font-size: 14px; color: #00d4ff;');
console.log('%c Build with us: hello@lsmarketingagency.com', 'font-size: 12px; color: #b0b8d4;');
