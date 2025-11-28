// Wait for the DOM to load 
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    setTheme(savedTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) { 
        htmlElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
    
    // Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link on Scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Contact Form Submission with Enhanced Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        // Add floating label effect
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Check initial state
                if (input.value.trim() !== '') {
                    group.classList.add('has-value');
                }
                
                // Add focus event
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                // Add blur event
                input.addEventListener('blur', () => {
                    group.classList.remove('focused');
                    if (input.value.trim() !== '') {
                        group.classList.add('has-value');
                    } else {
                        group.classList.remove('has-value');
                    }
                });
                
                // Add input event for real-time validation
                input.addEventListener('input', () => {
                    if (input.value.trim() !== '') {
                        group.classList.add('has-value');
                    } else {
                        group.classList.remove('has-value');
                    }
                });
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Enhanced validation
            let isValid = true;
            let errorMessage = '';
            
            if (!name.trim()) {
                isValid = false;
                errorMessage += 'Name is required\n';
            }
            
            if (!email.trim()) {
                isValid = false;
                errorMessage += 'Email is required\n';
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address\n';
            }
            
            if (!subject.trim()) {
                isValid = false;
                errorMessage += 'Subject is required\n';
            }
            
            if (!message.trim()) {
                isValid = false;
                errorMessage += 'Message is required\n';
            } else if (message.trim().length < 10) {
                isValid = false;
                errorMessage += 'Message should be at least 10 characters\n';
            }
            
            if (!isValid) {
                alert('Please correct the following errors:\n' + errorMessage);
                return;
            }
            
            // Display success message with animation
            const formWrapper = contactForm.parentElement;
            
            // Create success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message scale-up';
            successMsg.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
                <button class="primary-btn" id="resetForm">Send Another Message</button>
            `;
            
            // Hide form and show success message
            contactForm.classList.add('fade-out');
            
            setTimeout(() => {
                contactForm.style.display = 'none';
                formWrapper.appendChild(successMsg);
                
                // Add reset button functionality
                document.getElementById('resetForm').addEventListener('click', function() {
                    contactForm.reset();
                    successMsg.classList.add('fade-out');
                    
                    setTimeout(() => {
                        successMsg.remove();
                        contactForm.style.display = 'block';
                        contactForm.classList.remove('fade-out');
                        contactForm.classList.add('fade-in');
                    }, 300);
                });
            }, 300);
        });
    }
    
    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-up, .reveal');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .timeline-item');
    animateElements.forEach(element => {
        if (!element.classList.contains('fade-in') && 
            !element.classList.contains('slide-in-left') &&
            !element.classList.contains('slide-in-right') &&
            !element.classList.contains('scale-up')) {
            element.classList.add('reveal');
        }
    });
    
    // Add CSS for animations and form success
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
            background-color: var(--card-bg);
            border-radius: 10px;
            box-shadow: var(--box-shadow);
        }
        
        .success-icon {
            font-size: 50px;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            margin-bottom: 15px;
        }
        
        .success-message p {
            margin-bottom: 30px;
        }
        
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 10px var(--shadow-color);
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--primary-dark);
            transform: translateY(-3px);
        }
        
        header.scrolled {
            padding: 10px 0;
            box-shadow: 0 5px 15px var(--shadow-color);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .form-group.focused::after {
            width: 100%;
        }
        
        .form-group.has-value label,
        .form-group.focused label {
            top: -10px;
            left: 10px;
            font-size: 12px;
            background-color: var(--primary-color);
            color: white;
            padding: 0 5px;
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);
    
    // Typed.js effect for hero section
    if (window.Typed) {
        new Typed('#typed-text', {
            strings: ['Machine Learning Engineer', 'AI Developer', 'Computer Vision Specialist'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
    
    // Particles background effect (optional - uncomment if adding particles)
    /*
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#4a6cf7' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4a6cf7',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
    */
}); 
