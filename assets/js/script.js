document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.btn-next');
    const prevButton = document.querySelector('.btn-prev');
    const dotsNav = document.querySelector('.slider-indicators');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    }
    // Note: We are using flexbox, so 'left' positioning isn't strictly necessary if we translate the track properly based on index * 100%.
    // But for a simple transform: translateX logic, let's just stick to index based percentage.

    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    const updateSlidePosition = () => {
        const amountToMove = - (currentSlideIndex * 100);
        track.style.transform = `translateX(${amountToMove}%)`;

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlideIndex].classList.add('active');

        // Reset animations for content
        const currentSlide = slides[currentSlideIndex];
        const content = currentSlide.querySelector('.slide-content');

        // Simple trick to restart css animation
        content.style.animation = 'none';
        content.offsetHeight; /* trigger reflow */
        content.style.animation = 'fadeUp 1s forwards 0.5s';
    }

    const moveToNextSlide = () => {
        currentSlideIndex++;
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
        }
        updateSlidePosition();
    }

    const moveToPrevSlide = () => {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        updateSlidePosition();
    }

    // Event listeners
    nextButton.addEventListener('click', () => {
        moveToNextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        moveToPrevSlide();
        resetAutoPlay();
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('div');
        if (!targetDot) return;

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        currentSlideIndex = targetIndex;
        updateSlidePosition();
        resetAutoPlay();
    });

    // Autoplay
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(moveToNextSlide, 5000);
    }

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();

    // Scroll Vanish / Stacking Logic
    const cards = document.querySelectorAll('.card-item');

    // We want to detect when a wrapper hits a certain point and the next one is coming up
    // Simple approach: Use IntersectionObserver to scale down the previous card

    // Actually, simple Scroll Event for "Stacking and Vanishing" is smoother for this specific effect
    const stackContainer = document.querySelector('.stack-container');

    if (cards.length > 0 && stackContainer) {
        window.addEventListener('scroll', () => {
            cards.forEach((card, index) => {
                // If it's the last card, we don't need to vanish it necessarily, but let's see.
                if (index === cards.length - 1) return;

                const cardTop = card.getBoundingClientRect().top;
                const nextCard = cards[index + 1];
                const nextCardTop = nextCard.getBoundingClientRect().top;

                // Distance between this card and the next one
                const distance = nextCardTop - cardTop;

                // If the next card is overlapping this card (distance < cardHeight roughly)
                // We want to start fading out this card

                // However, with position:sticky, they are on top of each other when scrolled.
                // The 'distance' effectively shrinks as the next card scrolls up over the sticky one.

                // When nextCardTop is close to window height * 0.15 (the top offset), the overlap is full.
                // When nextCardTop is far valid (e.g. bottom of screen), overlap is 0.

                // Let's use logic: As next card comes up, fade out current card.

                const triggerPoint = window.innerHeight * 0.5; // Start fading when next card is halfway up

                // Calculate percentage of overlap/closeness
                // We want effect to start when next card is entering viewport? No, when it's covering the previous one.

                // With sticky, the 'current' card stays at top: 15vh.
                // The 'next' card comes from bottom.
                // So we check nextCard.top

                const nextCardDistanceFromTop = nextCard.getBoundingClientRect().top;
                const stickyTop = window.innerHeight * 0.15; // 15vh

                // Range for animation: 
                // Start: Next card is 800px down
                // End: Next card is at 150px down (sticky top)

                const startFade = window.innerHeight * 0.8;
                const endFade = stickyTop + 50; // A bit below sticky top

                if (nextCardDistanceFromTop < startFade) {
                    // Map range [startFade, endFade] to [1, 0] opacity
                    const progress = (startFade - nextCardDistanceFromTop) / (startFade - endFade);
                    // clamp progress 0 to 1
                    const p = Math.max(0, Math.min(1, progress));

                    // Apply styles
                    // Scale: 1 -> 0.9
                    // Opacity: 1 -> 0
                    // Filter: 0 -> 10px

                    card.style.transform = `scale(${1 - (p * 0.1)})`;
                    card.style.opacity = `${1 - p}`;
                    card.style.filter = `blur(${p * 10}px)`;
                } else {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                    card.style.filter = 'blur(0px)';
                }
            });
        });
    }

});
