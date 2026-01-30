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
    const visibleSlides = getVisibleSlides();
    const maxIndex = gallerySlides.length - visibleSlides;
    
    if (direction === 'next') {
        galleryIndex = galleryIndex >= maxIndex ? 0 : galleryIndex + 1;
    } else {
        galleryIndex = galleryIndex <= 0 ? maxIndex : galleryIndex - 1;
    }
    
    updateGalleryPosition();
}

function getVisibleSlides() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
}

if (galleryPrev && galleryNext && galleryTrack) {
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
    
    // Initialize on page load
    window.addEventListener('load', () => {
        updateGalleryPosition();
    });
}

function startGalleryAutoPlay() {
    if (!galleryTrack) return;
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
let facultyScrollPosition = 0;

if (facultyTrack) {
    // Duplicate faculty cards for infinite scroll effect
    const facultyCards = document.querySelectorAll('.faculty-card');
    facultyCards.forEach(card => {
        const clone = card.cloneNode(true);
        facultyTrack.appendChild(clone);
    });
}

if (facultyPrev && facultyTrack) {
    facultyPrev.addEventListener('click', () => {
        const cardWidth = facultyTrack.querySelector('.faculty-card').offsetWidth + 30; // card width + gap
        facultyScrollPosition = Math.max(0, facultyScrollPosition - cardWidth);
        facultyTrack.style.transform = `translateX(-${facultyScrollPosition}px)`;
        facultyTrack.style.transition = 'transform 0.5s ease';
    });
}

if (facultyNext && facultyTrack) {
    facultyNext.addEventListener('click', () => {
        const cardWidth = facultyTrack.querySelector('.faculty-card').offsetWidth + 30;
        const maxScroll = facultyTrack.scrollWidth / 2; // Half because we duplicated
        facultyScrollPosition += cardWidth;
        
        if (facultyScrollPosition >= maxScroll) {
            facultyScrollPosition = 0; // Reset to beginning
        }
        
        facultyTrack.style.transform = `translateX(-${facultyScrollPosition}px)`;
        facultyTrack.style.transition = 'transform 0.5s ease';
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

// Toggle Section Visibility (See More/Less)
function toggleSection(sectionId, button) {
    const section = document.getElementById(sectionId);
    const btnText = button.querySelector('.btn-text');
    const btnIcon = button.querySelector('.btn-icon');
    
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        button.classList.add('expanded');
        if (btnText.textContent.includes('See More') || btnText.textContent.includes('Read Full')) {
            btnText.textContent = btnText.textContent.replace('See More', 'See Less').replace('Read Full Story', 'Show Less');
        }
    } else {
        section.style.display = 'none';
        button.classList.remove('expanded');
        if (btnText.textContent.includes('See Less') || btnText.textContent.includes('Show Less')) {
            btnText.textContent = btnText.textContent.replace('See Less', 'See More').replace('Show Less', 'Read Full Story');
        }
    }
    
    // Smooth scroll to button after expansion
    setTimeout(() => {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Toggle Additional Menu
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
}

// Show Hidden Section (from old index)
function showSection(sectionName) {
    // This would load content from a modal or separate page
    // For now, alert user that section is available
    alert(`${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} section will be loaded. This feature needs backend implementation or modal popup.`);
    
    // Alternative: Scroll to contact for more info
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
