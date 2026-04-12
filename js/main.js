// Typing animation
const words = ["UI/UX Designerr", "Web Devv", "Freelancerr", "Fullstack Devv", "Automationn"];
const typingDelay = 150;
const deletingDelay = 50;
const pauseDelay = 1500;

let currentWordIndex = 0;
let currentText = "";
let isDeleting = false;

const typingElement = document.getElementById("typing-text");

function typeText() {
    const currentWord = words[currentWordIndex];

    if (!isDeleting) {
        currentText = currentWord.substring(0, currentText.length + 1);

        if (currentText.length >= currentWord.length) {
            isDeleting = true;
            setTimeout(typeText, pauseDelay);
            return;
        }
    } else {
        currentText = currentWord.substring(0, currentText.length - 1);

        if (currentText === "") {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
        }
    }

    typingElement.textContent = currentText;

    setTimeout(typeText, isDeleting ? deletingDelay : typingDelay);
}

window.addEventListener('load', () => {
    typeText();
});

window.addEventListener('load', function () {
    const loader = document.querySelector('.loader-container');
    setTimeout(function () {
        loader.classList.add('hide-loader');
    }, 1000);
});


// ========================================
// Mobile menu with scroll position fix
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
let scrollPosition = 0;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        // Store scroll position and lock body
        scrollPosition = window.pageYOffset;
        document.body.classList.add('menu-open');
        document.body.style.top = `-${scrollPosition}px`;

        navItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.1 + index * 0.1}s`;
        });
    } else {
        // Restore scroll position and unlock body
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);

        navItems.forEach(item => {
            item.style.transitionDelay = '0s';
        });
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    });
});

document.addEventListener('click', (event) => {
    const isClickInside = navLinks.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInside && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
});


// ========================================
// Active nav link highlighting on scroll
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    const scrollPos = window.scrollY + 120; // offset for fixed header

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === `#${currentSection}`) {
            anchor.classList.add('active');
        }
    });
}


// ========================================
// Scroll event handler
// ========================================
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (itemPosition < screenPosition) {
            item.classList.add('visible');
        }
    });

    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;

        if (barPosition < screenPosition) {
            const progress = bar.querySelector('.progress');
            progress.style.width = progress.parentElement.previousElementSibling.lastElementChild.textContent;
        }
    });

    // Update active nav link
    updateActiveNavLink();
});


// ========================================
// Back to top button
// ========================================
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', (e) => {
    e.preventDefault();

    backToTop.classList.add('clicked');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {
        backToTop.classList.remove('clicked');
    }, 800);
});


// ========================================
// Smooth scroll with header offset
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ========================================
// Contact form validation
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    function validateInput(input, errorElement, errorMessage) {
        if (input.validity.valid) {
            errorElement.textContent = '';
            input.classList.remove('invalid');
            return true;
        } else {
            errorElement.textContent = errorMessage;
            input.classList.add('invalid');
            return false;
        }
    }

    nameInput.addEventListener('input', () => {
        validateInput(nameInput, nameError, 'Please enter a valid name (letters and spaces only, 2-50 characters)');
    });

    emailInput.addEventListener('input', () => {
        validateInput(emailInput, emailError, 'Please enter a valid email address');
    });

    subjectInput.addEventListener('input', () => {
        validateInput(subjectInput, subjectError, 'Please enter a valid subject (2-100 characters)');
    });

    messageInput.addEventListener('input', () => {
        validateInput(messageInput, messageError, 'Please enter a message (at least 10 characters)');
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateInput(nameInput, nameError, 'Please enter a valid name (letters and spaces only)');
        const isEmailValid = validateInput(emailInput, emailError, 'Please enter a valid email address');
        const isSubjectValid = validateInput(subjectInput, subjectError, 'Please enter a valid subject');
        const isMessageValid = validateInput(messageInput, messageError, 'Please enter a message (at least 10 characters)');

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status sending';

            const serviceID = 'service_qrpqmqm';
            const templateID = 'template_xpr754j';

            const templateParams = {
                name: nameInput.value,
                email: emailInput.value,
                title: subjectInput.value,
                message: messageInput.value
            };

            emailjs.send(serviceID, templateID, templateParams)
                .then(function () {
                    formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();

                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }, 5000);
                })
                .catch(function (error) {
                    console.error('Email sending failed:', error);

                    const mailtoLink = `mailto:marleovallada0@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent('Name: ' + nameInput.value + '\nEmail: ' + emailInput.value + '\n\n' + messageInput.value)}`;

                    formStatus.innerHTML = `
                        Sorry, there was an error sending your message.<br>
                        <a href="${mailtoLink}" class="mailto-link">Click here to send via your email client</a>
                    `;
                    formStatus.className = 'form-status error';
                });
        }
    });
}


// ========================================
// DOMContentLoaded: init all interactive features
// ========================================
document.addEventListener('DOMContentLoaded', function () {

    // Tech tag tooltips for touch
    const techTags = document.querySelectorAll('.project-tech-wrapper .tech-tag');

    techTags.forEach(tag => {
        tag.addEventListener('touchstart', function (e) {
            techTags.forEach(t => t.classList.remove('active-tooltip'));

            this.classList.add('active-tooltip');

            e.preventDefault();
        }, { passive: false });
    });

    document.addEventListener('touchstart', function (e) {
        if (!e.target.closest('.tech-tag')) {
            techTags.forEach(tag => tag.classList.remove('active-tooltip'));
        }
    });

    // Clickable contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function (e) {
                if (!e.target.closest('a')) {
                    if (link.getAttribute('target') === '_blank') {
                        window.open(link.href, '_blank');
                    } else {
                        window.location.href = link.href;
                    }
                }
            });
        }
    });

    // Cert card tap-to-flip on touch devices
    initCertCardFlip();

    // Init carousels
    initProjectCarousels();

    // Set initial active nav link
    updateActiveNavLink();
});


// ========================================
// Cert card tap-to-flip for mobile
// ========================================
function initCertCardFlip() {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice) return;

    const certCards = document.querySelectorAll('.cert-card');

    certCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Don't flip if clicking the verify link
            if (e.target.closest('.cert-verify-btn')) return;

            this.classList.toggle('flipped');
        });
    });
}


// ========================================
// Project carousels
// ========================================
function initProjectCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const counter = carousel.querySelector('.carousel-counter');
        const currentCounter = counter ? counter.querySelector('.current') : null;
        const totalCounter = counter ? counter.querySelector('.total') : null;

        if (currentCounter && totalCounter) {
            currentCounter.textContent = '1';
            totalCounter.textContent = slides.length.toString();
        }

        let currentIndex = 0;
        let autoplayInterval;
        let isTransitioning = false;

        prevBtn.addEventListener('click', () => {
            if (!isTransitioning) {
                isTransitioning = true;
                prevSlide();
                resetAutoplay();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (!isTransitioning) {
                isTransitioning = true;
                nextSlide();
                resetAutoplay();
            }
        });

        startAutoplay();

        carousel.addEventListener('mouseenter', () => {
            stopAutoplay();
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoplay();
        });

        function prevSlide() {
            goToSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        function nextSlide() {
            goToSlide((currentIndex + 1) % slides.length);
        }

        function goToSlide(index) {
            if (currentIndex === index) {
                isTransitioning = false;
                return;
            }

            slides[currentIndex].classList.remove('active');

            slides[index].classList.add('active');

            if (currentCounter) {
                currentCounter.textContent = (index + 1).toString();
            }

            currentIndex = index;

            setTimeout(() => {
                isTransitioning = false;
            }, 1000);
        }

        function startAutoplay() {
            stopAutoplay();

            autoplayInterval = setInterval(() => {
                if (!isTransitioning) {
                    isTransitioning = true;
                    nextSlide();
                }
            }, 5000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });

        function handleSwipe() {
            if (!isTransitioning) {
                const swipeThreshold = 50;
                const swipeDistance = touchEndX - touchStartX;

                if (swipeDistance < -swipeThreshold) {
                    isTransitioning = true;
                    nextSlide();
                } else if (swipeDistance > swipeThreshold) {
                    isTransitioning = true;
                    prevSlide();
                }
            }
        }

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (!isTransitioning) {
                if (e.key === 'ArrowLeft') {
                    isTransitioning = true;
                    prevSlide();
                    resetAutoplay();
                    e.preventDefault();
                } else if (e.key === 'ArrowRight') {
                    isTransitioning = true;
                    nextSlide();
                    resetAutoplay();
                    e.preventDefault();
                }
            }
        });

        // Image lazy loading indicator
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.onload = function () {
                    slide.classList.add('loaded');
                };

                if (img.complete) {
                    slide.classList.add('loaded');
                }
            }
        });

        carousel.setAttribute('tabindex', '0');
    });
}
