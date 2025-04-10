// Get all DOM elements
const body = document.body;
const curtainContainer = document.querySelector('.curtain-container');
const loginContainer = document.querySelector('.login-container');
const skyContainer = document.querySelector('.sky-container');

// Fix the audio path - use absolute path from root
const curtainSound = new Audio('../Assets/aura.mp3');
// Set properties for better playback control
curtainSound.loop = false;
curtainSound.volume = 0.7;
curtainSound.muted = true; // Inicialmente silenciado

let userInteracted = false;

// Function to handle the animation sequence
function playOpenAnimation() {
    curtainContainer.classList.add('open');
    
    // Solo reproduce el sonido si el usuario ha interactuado
    if (userInteracted) {
        curtainSound.muted = false;
        curtainSound.play().catch((error) => {
            console.warn('Audio could not play:', error);
        });
    }
    
    setTimeout(() => {
        body.classList.add('blinds-open');
        skyContainer.classList.add('sunrise');
    }, 500);
}

// Function to reset animation
function resetAnimation() {
    curtainContainer.classList.remove('open');
    body.classList.remove('blinds-open');
    skyContainer.classList.remove('sunrise');
    
    // Pause and reset audio
    curtainSound.pause();
    curtainSound.currentTime = 0;
}

// When mouse enters the login form
loginContainer.addEventListener('mouseenter', function() {
    playOpenAnimation();
});

// Optional: Reset when mouse leaves page
document.addEventListener('mouseleave', function() {
    resetAnimation();
});

// Handle user interaction to enable audio
document.addEventListener('click', function() {
    userInteracted = true;
    
    // Si la animación ya está en curso, activar el audio
    if (curtainContainer.classList.contains('open') && curtainSound.paused) {
        curtainSound.muted = false;
        curtainSound.play().catch(error => {
            console.warn('Audio still blocked:', error);
        });
    }
});

// Auto-play animation when page loads (after a delay)
window.addEventListener('load', function() {
    setTimeout(() => {
        playOpenAnimation();
    }, 1000);
});

// Añadir un botón de sonido al HTML para control explícito
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
    
    soundButton.addEventListener('click', function() {
        userInteracted = true;
        curtainSound.muted = !curtainSound.muted;
        soundButton.innerHTML = curtainSound.muted ? '🔇' : '🔊';
        
        if (!curtainSound.muted && curtainContainer.classList.contains('open')) {
            curtainSound.play().catch(error => {
                console.warn('Audio still blocked:', error);
            });
        }
    });
    
    document.body.appendChild(soundButton);
});