/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

/*SCROLL HOME*/
sr.reveal('.home__title', {})
sr.reveal('.home__scroll', {delay: 200})
sr.reveal('.home__img', {origin:'right', delay: 400})

/*SCROLL ABOUT*/
sr.reveal('.about__img', {delay: 500})
sr.reveal('.about__subtitle', {delay: 300})
sr.reveal('.about__profession', {delay: 400})
sr.reveal('.about__text', {delay: 500})
sr.reveal('.about__social-icon', {delay: 600, interval: 200})

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {})
sr.reveal('.skills__name', {distance: '20px', delay: 50, interval: 100})
sr.reveal('.skills__img', {delay: 400})

/*SCROLL PORTFOLIO*/
sr.reveal('.portfolio__img', {interval: 200})

/*SCROLL CONTACT*/
sr.reveal('.contact__subtitle', {})
sr.reveal('.contact__text', {interval: 200})
sr.reveal('.contact__input', {delay: 400})
sr.reveal('.contact__button', {delay: 600})

// Main navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.navbar-link');
    const articles = document.querySelectorAll('article[data-page]');

    function showPage(targetPage) {
        // Hide all articles first
        articles.forEach(article => {
            article.classList.remove('active');
            article.style.display = 'none';
        });

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show the target article and activate its nav link
        const targetArticle = document.querySelector(`article[data-page="${targetPage}"]`);
        const targetLink = document.querySelector(`.navbar-link[data-page="${targetPage}"]`);

        if (targetArticle) {
            targetArticle.style.display = 'block';
            setTimeout(() => {
                targetArticle.classList.add('active');
            }, 50);
        }

        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-page');
            showPage(targetPage);
        });
    });

    // Show initial page (About)
    showPage('about');

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-item');
    const projectItems = document.querySelectorAll('[data-filter-item]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-btn');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    function validateForm() {
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
            if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
            }
        });
        submitButton.disabled = !isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    formInputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        contactForm.reset();
        submitButton.disabled = true;
    });

    // Sidebar toggle
    const sidebarBtn = document.querySelector('[data-sidebar-btn]');
    const sidebar = document.querySelector('[data-sidebar]');

    if (sidebarBtn) {
        sidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            const btnText = sidebarBtn.querySelector('span');
            const icon = sidebarBtn.querySelector('ion-icon');
            
            if (btnText) {
                btnText.textContent = sidebar.classList.contains('active') ? 'Hide Contacts' : 'Show Contacts';
            }
            
            if (icon) {
                icon.style.transform = sidebar.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    }
});



