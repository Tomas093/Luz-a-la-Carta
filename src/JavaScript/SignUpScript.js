// Get all DOM elements
const body = document.body;
const curtainContainer = document.querySelector('.curtain-container');
const signupContainer = document.querySelector('.signup-container');
const skyContainer = document.querySelector('.sky-container');
const stickman = document.querySelector('.stickman');
const curtain = document.querySelector('.curtain');
const rope = document.querySelector('.rope');

// Fix the audio path
const pullSound = new Audio('../Assets/rope-pull.mp3');
pullSound.volume = 0.5;
pullSound.muted = true; // Initially muted

let userInteracted = false;
let curtainLifted = false;

// Function to handle the animation sequence
function playPullAnimation() {
    if (curtainLifted) return; // Prevent repeated animations
    
    // Animate stickman pulling
    stickman.classList.add('pulling');
    
    // After a short delay, start lifting the curtain
    setTimeout(() => {
        curtainContainer.classList.add('partial-open');
        curtainContainer.classList.add('pull-rope');
        
        // Only play sound if user has interacted
        if (userInteracted) {
            pullSound.muted = false;
            pullSound.play().catch((error) => {
                console.warn('Audio could not play:', error);
            });
        }
        
        // After curtain is lifted, show the form
        setTimeout(() => {
            body.classList.add('curtain-lifted');
            skyContainer.classList.add('sunrise');
            curtainLifted = true;
            
            // Return stickman to original pose after pulling
            setTimeout(() => {
                stickman.classList.remove('pulling');
                stickman.classList.add('returning');
                
                // Remove returning class after animation completes
                setTimeout(() => {
                    stickman.classList.remove('returning');
                }, 500);
            }, 1000);
        }, 1000);
    }, 500);
}

// Click on stickman to trigger animation
stickmanContainer = document.querySelector('.stickman-container');
stickmanContainer.addEventListener('click', function() {
    userInteracted = true;
    playPullAnimation();
});

// Handle user interaction to enable audio
document.addEventListener('click', function() {
    userInteracted = true;
});

// Add sound toggle button
window.addEventListener('DOMContentLoaded', function() {
    const soundButton = document.createElement('button');
    soundButton.innerHTML = '🔊';
    soundButton.className = 'sound-toggle';
    soundButton.style.position = 'absolute';
    soundButton.style.bottom = '20px';
    soundButton.style.right = '20px';
    soundButton.style.zIndex = '1000';
    soundButton.style.padding = '10px';
    soundButton.style.background = 'rgba(255, 255, 255, 0.7)';
    soundButton.style.border = 'none';
    soundButton.style.borderRadius = '50%';
    soundButton.style.cursor = 'pointer';
    
    soundButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering other click handlers
        userInteracted = true;
        pullSound.muted = !pullSound.muted;
        soundButton.innerHTML = pullSound.muted ? '🔇' : '🔊';
    });
    
    document.body.appendChild(soundButton);
    
    // Add a hint prompt to click the stickman
    const hintPrompt = document.createElement('div');
    hintPrompt.textContent = 'Click the stickman to reveal signup form';
    hintPrompt.style.position = 'absolute';
    hintPrompt.style.bottom = '70px';
    hintPrompt.style.left = '20px';
    hintPrompt.style.zIndex = '1000';
    hintPrompt.style.padding = '10px';
    hintPrompt.style.background = 'rgba(255, 255, 255, 0.7)';
    hintPrompt.style.borderRadius = '5px';
    hintPrompt.style.fontSize = '14px';
    hintPrompt.style.color = '#333';
    hintPrompt.style.opacity = '1';
    hintPrompt.style.transition = 'opacity 1s ease';
    
    document.body.appendChild(hintPrompt);
    
    // Hide hint when animation starts
    stickmanContainer.addEventListener('click', function() {
        hintPrompt.style.opacity = '0';
        setTimeout(() => {
            hintPrompt.remove();
        }, 1000);
    });
});