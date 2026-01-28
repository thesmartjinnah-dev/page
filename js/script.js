// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Hero Slider
let slideIndex = 1;
let slideTimer;

showSlides(slideIndex);
startAutoSlide();

function changeSlide(n) {
    clearInterval(slideTimer);
    showSlides(slideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(slideTimer);
    showSlides(slideIndex = n);
    startAutoSlide();
}

function showSlides(n) {
    let slides = document.getElementsByClassName('slide');
    let dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

function startAutoSlide() {
    slideTimer = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); // Change slide every 5 seconds
}

// Tabs for Achievements
function openTab(evt, tabName) {
    let tabContent = document.getElementsByClassName('tab-content');
    let tabBtns = document.getElementsByClassName('tab-btn');
    
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove('active');
    }
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Gallery Slider
let galleryIndex = 0;
const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
let galleryAutoPlay;

function updateGalleryPosition() {
    if (!galleryTrack || !gallerySlides.length) return;
    
    const slideWidth = gallerySlides[0].offsetWidth;
    const gap = 20;
    const offset = galleryIndex * (slideWidth + gap);
    galleryTrack.style.transform = `translateX(-${offset}px)`;
}

function moveGallery(direction) {
    const maxIndex = gallerySlides.length - getVisibleSlides();
    
    if (direction === 'next') {
        galleryIndex = galleryIndex >= maxIndex ? 0 : galleryIndex + 1;
    } else {
        galleryIndex = galleryIndex <= 0 ? maxIndex : galleryIndex - 1;
    }
    
    updateGalleryPosition();
}

function getVisibleSlides() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

if (galleryPrev && galleryNext) {
    galleryPrev.addEventListener('click', () => {
        clearInterval(galleryAutoPlay);
        moveGallery('prev');
        startGalleryAutoPlay();
    });

    galleryNext.addEventListener('click', () => {
        clearInterval(galleryAutoPlay);
        moveGallery('next');
        startGalleryAutoPlay();
    });
}

function startGalleryAutoPlay() {
    galleryAutoPlay = setInterval(() => {
        moveGallery('next');
    }, 4000);
}

// Start gallery auto-play
if (galleryTrack) {
    startGalleryAutoPlay();
    
    // Pause on hover
    galleryTrack.addEventListener('mouseenter', () => {
        clearInterval(galleryAutoPlay);
    });

    galleryTrack.addEventListener('mouseleave', () => {
        startGalleryAutoPlay();
    });
}

// Update gallery on window resize
window.addEventListener('resize', () => {
    galleryIndex = 0;
    updateGalleryPosition();
});

// Faculty Slider Controls
const facultyTrack = document.querySelector('.faculty-track');
const facultyPrev = document.querySelector('.faculty-prev');
const facultyNext = document.querySelector('.faculty-next');

if (facultyTrack) {
    // Duplicate faculty cards for infinite scroll
    const facultyCards = document.querySelectorAll('.faculty-card');
    facultyCards.forEach(card => {
        const clone = card.cloneNode(true);
        facultyTrack.appendChild(clone);
    });
}

if (facultyPrev) {
    facultyPrev.addEventListener('click', () => {
        facultyTrack.style.animationPlayState = 'paused';
        setTimeout(() => {
            facultyTrack.style.animationPlayState = 'running';
        }, 2000);
    });
}

if (facultyNext) {
    facultyNext.addEventListener('click', () => {
        facultyTrack.style.animationPlayState = 'paused';
        setTimeout(() => {
            facultyTrack.style.animationPlayState = 'running';
        }, 2000);
    });
}

// Smooth Scrolling
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

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.program-card, .why-item, .faculty-card, .result-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%cLSSA - Lt Safiullah Shaheed Academy', 'color: #1e3c72; font-size: 20px; font-weight: bold;');
console.log('%cLearning Today, Leading Tomorrow', 'color: #f39c12; font-size: 14px;');
