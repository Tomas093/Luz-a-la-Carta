const body = document.body;
    const curtainContainer = document.querySelector('.curtain-container');
    const signupContainer = document.querySelector('.signup-container');
    const skyContainer = document.querySelector('.sky-container');
    const stickmanContainer = document.querySelector('.stickman-container');
    const rope = document.querySelector('.rope');
    // Create an array of angle strings from 35 down to 0...
    const downAngles = Array.from({ length: 36 }, (_, i) => String(35 - i));
    // ...and back up from 1 to 35 (to create a continuous swinging motion)
    const upAngles = Array.from({ length: 35 }, (_, i) => String(i + 1));
    const poses = downAngles.concat(upAngles);
    let index = 0;
    let animationInterval = null;
    let curtainLifted = false;
    function startStickmanAnimation() {
  if (animationInterval) return;
  
  // Calculate total animation time to match curtain animation
  const totalAnimationTime = 100; // 5 seconds to match curtain/sun
  const totalFrames = poses.length;
  // Calculate interval time to complete all poses within the animation duration
  const intervalTime = Math.floor(totalAnimationTime / totalFrames);
  
  animationInterval = setInterval(() => {
    // Hide all arm sets
    poses.forEach(p => {
      const elem = document.getElementById('arms' + p);
      if (elem) {
        elem.classList.add('hidden');
      }
    });
    // Show the current arm set
    const currentArm = document.getElementById('arms' + poses[index]);
    if (currentArm) {
      currentArm.classList.remove('hidden');
    }
    index = (index + 1) % poses.length;
  }, intervalTime);
}
function liftCurtain() {
  if (curtainLifted) return;
  startStickmanAnimation();
  setTimeout(() => {
    curtainContainer.classList.add('curtain-open');
    // After the curtain lifts, stop animation and hide stickman and rope
    setTimeout(() => {
      clearInterval(animationInterval);
      animationInterval = null;
      stickmanContainer.style.opacity = "0";
      rope.style.opacity = "0";
    }, 5000); // Now matches the sun/curtain animation duration
    setTimeout(() => {
      body.classList.add('curtain-lifted');
      skyContainer.classList.add('sunrise');
      curtainLifted = true;
    }, 1000);
  }, 500);
}
function liftCurtain() {
  if (curtainLifted) return;
  startStickmanAnimation();
  setTimeout(() => {
    curtainContainer.classList.add('curtain-open');
    // After the curtain lifts, stop animation and hide stickman and rope
    // Increased from 2500ms to 5000ms to match the new curtain transition duration
    setTimeout(() => {
      clearInterval(animationInterval);
      animationInterval = null;
      stickmanContainer.style.opacity = "0";
      rope.style.opacity = "0";
    }, 5000); // Now matches the new curtain animation duration of 5s
    setTimeout(() => {
      body.classList.add('curtain-lifted');
      skyContainer.classList.add('sunrise');
      curtainLifted = true;
    }, 1000);
  }, 500);
}
    signupContainer.addEventListener('mouseenter', function() {
      liftCurtain();
    });
    window.addEventListener('DOMContentLoaded', function() {
      const hintPrompt = document.createElement('div');
      hintPrompt.textContent = 'Pase el cursor sobre el formulario para revelarlo';
      hintPrompt.className = 'hint-prompt';
      document.body.appendChild(hintPrompt);
      signupContainer.addEventListener('mouseenter', function() {
        hintPrompt.style.opacity = '0';
        setTimeout(() => {
          hintPrompt.remove();
        }, 1000);
      });
    });