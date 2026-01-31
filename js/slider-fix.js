// ====================================
// GALLERY SLIDER - COMPLETE FIX
// ====================================

let galleryCurrentIndex = 0;
let galleryInterval;
const galleryContainer = document.querySelector('.gallery-track');
const allGallerySlides = document.querySelectorAll('.gallery-slide');
const galleryLeftBtn = document.querySelector('.gallery-prev');
const galleryRightBtn = document.querySelector('.gallery-next');

function getGalleryVisibleCount() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
}

function updateGallerySlider() {
    if (!galleryContainer || allGallerySlides.length === 0) return;
    
    const slideWidth = allGallerySlides[0].offsetWidth;
    const gap = 20;
    const moveAmount = (slideWidth + gap) * galleryCurrentIndex;
    
    galleryContainer.style.transform = `translateX(-${moveAmount}px)`;
    galleryContainer.style.transition = 'transform 0.6s ease-in-out';
}

function galleryNext() {
    const visibleCount = getGalleryVisibleCount();
    const maxIndex = allGallerySlides.length - visibleCount;
    
    if (galleryCurrentIndex >= maxIndex) {
        galleryCurrentIndex = 0;
    } else {
        galleryCurrentIndex++;
    }
    
    updateGallerySlider();
}

function galleryPrev() {
    const visibleCount = getGalleryVisibleCount();
    const maxIndex = allGallerySlides.length - visibleCount;
    
    if (galleryCurrentIndex <= 0) {
        galleryCurrentIndex = maxIndex;
    } else {
        galleryCurrentIndex--;
    }
    
    updateGallerySlider();
}

function startGalleryAutoSlide() {
    stopGalleryAutoSlide();
    galleryInterval = setInterval(galleryNext, 4000);
}

function stopGalleryAutoSlide() {
    if (galleryInterval) {
        clearInterval(galleryInterval);
    }
}

// Initialize gallery
if (galleryContainer && allGallerySlides.length > 0) {
    // Button events
    if (galleryLeftBtn) {
        galleryLeftBtn.addEventListener('click', () => {
            stopGalleryAutoSlide();
            galleryPrev();
            startGalleryAutoSlide();
        });
    }
    
    if (galleryRightBtn) {
        galleryRightBtn.addEventListener('click', () => {
            stopGalleryAutoSlide();
            galleryNext();
            startGalleryAutoSlide();
        });
    }
    
    // Pause on hover
    galleryContainer.addEventListener('mouseenter', stopGalleryAutoSlide);
    galleryContainer.addEventListener('mouseleave', startGalleryAutoSlide);
    
    // Start auto-slide
    startGalleryAutoSlide();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        galleryCurrentIndex = 0;
        updateGallerySlider();
    });
}

// ====================================
// FACULTY SLIDER - COMPLETE FIX
// ====================================

let facultyCurrentIndex = 0;
const facultyContainer = document.querySelector('.faculty-track');
const facultyLeftBtn = document.querySelector('.faculty-prev');
const facultyRightBtn = document.querySelector('.faculty-next');
let originalFacultyCards = [];

// Initialize faculty slider
if (facultyContainer) {
    originalFacultyCards = Array.from(document.querySelectorAll('.faculty-card'));
    
    // Duplicate cards for infinite effect
    originalFacultyCards.forEach(card => {
        const clone = card.cloneNode(true);
        facultyContainer.appendChild(clone);
    });
}

const allFacultyCards = document.querySelectorAll('.faculty-card');

function updateFacultySlider() {
    if (!facultyContainer || allFacultyCards.length === 0) return;
    
    const cardWidth = allFacultyCards[0].offsetWidth;
    const gap = 30;
    const moveAmount = (cardWidth + gap) * facultyCurrentIndex;
    
    facultyContainer.style.transform = `translateX(-${moveAmount}px)`;
    facultyContainer.style.transition = 'transform 0.5s ease';
    
    // Reset to start when reaching duplicates
    if (facultyCurrentIndex >= originalFacultyCards.length) {
        setTimeout(() => {
            facultyContainer.style.transition = 'none';
            facultyCurrentIndex = 0;
            const resetAmount = 0;
            facultyContainer.style.transform = `translateX(-${resetAmount}px)`;
        }, 500);
    }
}

function facultyNext() {
    facultyCurrentIndex++;
    updateFacultySlider();
}

function facultyPrev() {
    if (facultyCurrentIndex <= 0) {
        // Jump to end (duplicates section)
        facultyContainer.style.transition = 'none';
        facultyCurrentIndex = originalFacultyCards.length;
        updateFacultySlider();
        
        setTimeout(() => {
            facultyCurrentIndex--;
            updateFacultySlider();
        }, 50);
    } else {
        facultyCurrentIndex--;
        updateFacultySlider();
    }
}

// Initialize faculty controls
if (facultyLeftBtn) {
    facultyLeftBtn.addEventListener('click', facultyPrev);
}

if (facultyRightBtn) {
    facultyRightBtn.addEventListener('click', facultyNext);
}

console.log('Gallery and Faculty sliders initialized!');
