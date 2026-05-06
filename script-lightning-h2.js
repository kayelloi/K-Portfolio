function adjustLightningHeight() {
    const lightning = document.querySelector('.page-lightning-container');
    const firstHeading = document.querySelector('section h2'); 
    const cta = document.querySelector('.cta-content');

    //lightning.style.backgroundColor = "rgba(255, 0, 0, 0.2)";

    if (!firstHeading || !cta || !lightning) {
        console.log("Lightning elements not found on this page.");
        return;
    }

    // Get current scroll position to calculate absolute page coordinates
    const scrollY = window.scrollY;

    // 1. Get the middle of the first heading
    const headingRect = firstHeading.getBoundingClientRect();
    const startPos = (headingRect.top + scrollY) - 25;
    
    // 2. Get the top of the CTA section
    const ctaRect = cta.getBoundingClientRect();
    const endPos = (ctaRect.top + scrollY) + 105;

    // 3. Calculate and apply height
    const totalHeight = endPos - startPos;
    
    lightning.style.top = `${startPos}px`;
    lightning.style.height = `${totalHeight}px`;
}

// Ensure the script waits for images and layout to settle before measuring
window.addEventListener('load', adjustLightningHeight);
window.addEventListener('resize', adjustLightningHeight);