
let activePlayer = 1;
let selectedCharacter = 'roy.jpg';

const chars = document.querySelectorAll('.char-card');
const p1 = document.querySelector('.left');
const p2 = document.querySelector('.right');
const p1Preview = document.getElementById('p1-preview');
const p2Preview = document.getElementById('p2-preview');
const activePlayerDisplay = document.getElementById('active-player');
const playerStatuses = document.querySelectorAll('.player-status');
const confirmButtons = document.querySelectorAll('.confirm');
const hoverSound = document.getElementById('hover-sound');
const selectSound = document.getElementById('select-sound');
const confirmSound = document.getElementById('confirm-sound');

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(e => console.log("Audio play failed:", e));
}

chars.forEach(char => {
  const img = char.querySelector('.char');
  const placeholder = char.querySelector('.char-placeholder');
  
  char.addEventListener('mouseenter', () => {
    playSound(hoverSound);
     });
  
  
  char.addEventListener('click', () => {
    playSound(selectSound);
    
    chars.forEach(c => c.classList.remove('selected'));
    char.classList.add('selected');
    
    if (img && img.src) {
      selectedCharacter = img.src.split('/').pop();
      
      if (activePlayer === 1) {
        p1Preview.src = img.src;
        playerStatuses[0].textContent = 'SELECTED';
        playerStatuses[0].style.color = '#00ff00';
      } else {
        p2Preview.src = img.src;
        playerStatuses[1].textContent = 'SELECTED';
        playerStatuses[1].style.color = '#00ff00';
      }
    }
    
    char.style.transform = 'translateY(-10px)';
  });
});

p1.addEventListener('click', () => {
  activePlayer = 1;
  p1.classList.add('active');
  p2.classList.remove('active');
  activePlayerDisplay.textContent = 'P1';
  activePlayerDisplay.style.color = '#ff3300';
});

p2.addEventListener('click', () => {
  activePlayer = 2;
  p2.classList.add('active');
  p1.classList.remove('active');
  activePlayerDisplay.textContent = 'P2';
  activePlayerDisplay.style.color = '#0088ff';
});

confirmButtons.forEach((btn, index) => {
  btn.addEventListener('click', function() {
    playSound(confirmSound);
    
    const player = index === 0 ? 'P1' : 'P2';
    this.innerHTML = `<span class="btn-text">${player} CONFIRMED!</span>
                      <div class="btn-flames">
                        <div class="btn-flame"></div>
                        <div class="btn-flame"></div>
                        <div class="btn-flame"></div>
                      </div>`;
    this.style.background = 'linear-gradient(135deg, #00cc00, #00ff00)';
    this.style.boxShadow = '0 0 40px rgba(0, 255, 0, 0.9)';
    this.disabled = true;
    
    const playerArea = index === 0 ? p1 : p2;
    playerArea.style.borderColor = '#00ff00';
    playerArea.style.boxShadow = '0 0 50px rgba(0, 255, 0, 0.7), inset 0 0 50px rgba(0, 255, 0, 0.2)';
    
    playerStatuses[index].textContent = 'READY';
    playerStatuses[index].style.color = '#00ff00';
    playerStatuses[index].style.textShadow = '0 0 15px rgba(0, 255, 0, 0.9)';
    
    const healthBar = playerArea.querySelector('.health-fill');
    healthBar.style.background = 'linear-gradient(to right, #00ff00, #00cc00)';
    
    setTimeout(() => {
      if (index === 0) {
        p2.click();
      }
    }, 500);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const flameEffect = document.querySelector('.flame-effect');
  
  setInterval(() => {
    flameEffect.style.animation = 'none';
    setTimeout(() => {
      flameEffect.style.animation = 'flamePulse 1.5s infinite alternate';
    }, 10);
  }, 5000);
  
  const glitchTitle = document.querySelector('.glitch');
  
  setInterval(() => {
    glitchTitle.style.animation = 'none';
    setTimeout(() => {
      glitchTitle.style.animation = 'glitchAnim 3s infinite';
    }, 10);
  }, 8000);
  
  p1.click();
  chars[0].click();
});