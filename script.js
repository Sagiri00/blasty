const container = document.querySelector('.container');
const block = document.querySelector('.block');

function explode(element) {
  const explosionRadius = 200; 
  const numParticles = 30;   

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random angle and distance from the center
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * explosionRadius;

    // Calculate initial particle position on the circle (only done once!)
    const x = element.offsetLeft + element.offsetWidth / 2 + distance * Math.cos(angle);
    const y = element.offsetTop + element.offsetHeight / 2 + distance * Math.sin(angle);

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // Physics-based movement
    const speed = Math.random() * 10 + 5;
    const angleRad = Math.atan2(y - window.innerHeight / 2, x - window.innerWidth / 2); 
    let vx = speed * Math.cos(angleRad);
    let vy = speed * Math.sin(angleRad);

    // Gravity 
    const gravity = 0.5; 

    let currentX = 0; // Start from 0 for translateX
    let currentY = 0; // Start from 0 for translateY

    const updatePosition = () => {
      vy += gravity; 
      vx *= 0.98; 

      currentX += vx;
      currentY += vy;

      particle.style.transform = `translate(${currentX}px, ${currentY}px)`; 

      if (currentY + particle.offsetHeight < window.innerHeight) {
        requestAnimationFrame(updatePosition);
      } else {
        particle.style.top = window.innerHeight - particle.offsetHeight + 'px';
      }
    };

    updatePosition();
    container.appendChild(particle);

    // ... (Click listener and particle removal - same as before) ...
  }

  // ... (Hide original element - same as before) ...
}

block.addEventListener('click', () => explode(block));