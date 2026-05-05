function adjustLightningHeight() {
    const lightning = document.querySelector('.page-lightning-container');
    const endSection = document.querySelector('.np-content') || document.querySelector('.cta-content');
    
    //lightning.style.backgroundColor = "rgba(255, 0, 0, 0.2)";

    if (!lightning) return;

    if (!endSection) {
        console.log("No anchor section (NP or CTA) found on this page.");
        return;
    }

    // Get current scroll position to calculate absolute page coordinates
    const scrollY = window.scrollY;

    // 1. Get the middle of the first heading
    const startPos = 0;

    // 2. Get the top of the CTA section
    const endRect = endSection.getBoundingClientRect();
    const endPos = (endRect.top + scrollY) + 110;

    // 3. Calculate and apply height
    const totalHeight = endPos - startPos;
    
    lightning.style.top = `${startPos}px`;
    lightning.style.height = `${totalHeight}px`;
}

// Ensure the script waits for images and layout to settle before measuring
window.addEventListener('load', adjustLightningHeight);
window.addEventListener('resize', adjustLightningHeight);