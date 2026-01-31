// ====================================
// GALLERY SLIDER - WORKING VERSION
// ====================================

let galleryCurrentIndex = 0;
let galleryInterval;

function initGallerySlider() {
    const galleryContainer = document.querySelector('.gallery-track');
    const allGallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryLeftBtn = document.querySelector('.gallery-prev');
    const galleryRightBtn = document.querySelector('.gallery-next');
    
    if (!galleryContainer || !allGallerySlides.length) {
        console.log('Gallery elements not found');
        return;
    }
    
    console.log('Gallery found:', allGallerySlides.length, 'slides');
    
    function getGalleryVisibleCount() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }
    
    function updateGallerySlider() {
        const slideWidth = allGallerySlides[0].offsetWidth;
        const gap = 20;
        const moveAmount = (slideWidth + gap) * galleryCurrentIndex;
        
        galleryContainer.style.transform = `translateX(-${moveAmount}px)`;
        galleryContainer.style.transition = 'transform 0.6s ease-in-out';
        
        console.log('Gallery moved to index:', galleryCurrentIndex);
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
    
    // Button events
    if (galleryLeftBtn) {
        galleryLeftBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Gallery LEFT clicked');
            stopGalleryAutoSlide();
            galleryPrev();
            startGalleryAutoSlide();
        });
    }
    
    if (galleryRightBtn) {
        galleryRightBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Gallery RIGHT clicked');
            stopGalleryAutoSlide();
            galleryNext();
            startGalleryAutoSlide();
        });
    }
    
    // Hover pause
    galleryContainer.addEventListener('mouseenter', stopGalleryAutoSlide);
    galleryContainer.addEventListener('mouseleave', startGalleryAutoSlide);
    
    // Touch support
    let touchStartX = 0;
    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopGalleryAutoSlide();
    });
    
    galleryContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            galleryNext();
        } else if (touchEndX - touchStartX > 50) {
            galleryPrev();
        }
        startGalleryAutoSlide();
    });
    
    // Window resize
    window.addEventListener('resize', () => {
        galleryCurrentIndex = 0;
        updateGallerySlider();
    });
    
    // Start
    updateGallerySlider();
    startGalleryAutoSlide();
    
    console.log('Gallery slider initialized!');
}

// ====================================
// FACULTY SLIDER - WORKING VERSION
// ====================================

let facultyCurrentIndex = 0;

function initFacultySlider() {
    const facultyContainer = document.querySelector('.faculty-track');
    const facultyLeftBtn = document.querySelector('.faculty-prev');
    const facultyRightBtn = document.querySelector('.faculty-next');
    
    if (!facultyContainer) {
        console.log('Faculty elements not found');
        return;
    }
    
    const originalCards = Array.from(document.querySelectorAll('.faculty-card'));
    
    // Duplicate cards for infinite loop
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        facultyContainer.appendChild(clone);
    });
    
    const allCards = document.querySelectorAll('.faculty-card');
    console.log('Faculty found:', originalCards.length, 'teachers (', allCards.length, 'total with clones)');
    
    function updateFacultySlider() {
        const cardWidth = allCards[0].offsetWidth;
        const gap = 30;
        const moveAmount = (cardWidth + gap) * facultyCurrentIndex;
        
        facultyContainer.style.transform = `translateX(-${moveAmount}px)`;
        facultyContainer.style.transition = 'transform 0.5s ease';
        
        console.log('Faculty moved to index:', facultyCurrentIndex);
        
        // Reset if reached duplicates
        if (facultyCurrentIndex >= originalCards.length) {
            setTimeout(() => {
                facultyContainer.style.transition = 'none';
                facultyCurrentIndex = 0;
                facultyContainer.style.transform = `translateX(0px)`;
            }, 500);
        }
    }
    
    function facultyNext() {
        facultyCurrentIndex++;
        updateFacultySlider();
    }
    
    function facultyPrev() {
        if (facultyCurrentIndex <= 0) {
            facultyContainer.style.transition = 'none';
            facultyCurrentIndex = originalCards.length;
            facultyContainer.style.transform = `translateX(-${(allCards[0].offsetWidth + 30) * facultyCurrentIndex}px)`;
            
            setTimeout(() => {
                facultyCurrentIndex--;
                updateFacultySlider();
            }, 50);
        } else {
            facultyCurrentIndex--;
            updateFacultySlider();
        }
    }
    
    // Button events
    if (facultyLeftBtn) {
        facultyLeftBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Faculty LEFT clicked');
            facultyPrev();
        });
    }
    
    if (facultyRightBtn) {
        facultyRightBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Faculty RIGHT clicked');
            facultyNext();
        });
    }
    
    // Touch support
    let touchStartX = 0;
    facultyContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    facultyContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            facultyNext();
        } else if (touchEndX - touchStartX > 50) {
            facultyPrev();
        }
    });
    
    updateFacultySlider();
    console.log('Faculty slider initialized!');
}

// ====================================
// INITIALIZE ON PAGE LOAD
// ====================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGallerySlider();
        initFacultySlider();
    });
} else {
    initGallerySlider();
    initFacultySlider();
}

console.log('Slider script loaded');
