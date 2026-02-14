// Parallax Background Effect
const night = document.querySelector('.night');
const flowers = document.querySelectorAll('.flower');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    
    if (night) {
        night.style.setProperty('--parallax-x', `${x}px`);
        night.style.setProperty('--parallax-y', `${y}px`);
        
        // Move parallax layers
        const beforeElement = night.querySelector('::before') || night.parentElement;
        if (night.style.transform !== `translate(${x * 0.5}px, ${y * 0.5}px)`) {
            night.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        }
    }
});

// Click-to-Bloom Functionality
flowers.forEach((flower) => {
    flower.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove and re-add animation
        flower.classList.remove('bloom-reset');
        void flower.offsetWidth; // Trigger reflow
        flower.classList.add('bloom-reset');
        
        // Reset after animation
        setTimeout(() => {
            flower.classList.remove('bloom-reset');
        }, 1500);
        
        // Create sparkle effect
        createSparkles(flower);
    });
});

// Sparkle effect on click
function createSparkles(flower) {
    const rect = flower.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ffff99, #ff69b4);
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 6px rgba(255, 105, 180, 0.8);
            animation: sparkleFloat 1s ease-out forwards;
            z-index: 1000;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px) scale(0);
        }
    }
    
    @keyframes parallaxShift {
        0%, 100% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(-10px, -10px);
        }
    }
`;
document.head.appendChild(style);

// Add parallax transform to night div
const nightStyle = document.createElement('style');
nightStyle.textContent = `
    .night {
        --parallax-x: 0px;
        --parallax-y: 0px;
    }
`;
document.head.appendChild(nightStyle);

console.log('✨ Valentine\'s Day Page Loaded! Click on flowers to bloom them instantly! ✨');
