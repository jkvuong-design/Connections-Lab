const clearBtn = document.getElementById('clear-btn');
const buttonGroup = document.querySelector('.button-group');

// File paths
const STAR_IMAGE_FILENAME = 'heart.png';
const STAR_SOUND_FILENAME = 'star-sound.mp3';
const MUSIC_FILENAME = 'star-sound.mp3';

// Preload audio objects
const starAudio = new Audio(STAR_SOUND_FILENAME);
const bgMusic = new Audio(MUSIC_FILENAME);

let isMusicPlaying = false;

function playStarSound() {
  starAudio.currentTime = 0;
  starAudio.play().catch(() => {});
}

function startMusic() {
  bgMusic.loop = true;
  bgMusic.play().then(() => {
    isMusicPlaying = true;
  }).catch((err) => {
    console.warn('Music playback prevented or file missing:', err);
  });
}

function stopMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
  isMusicPlaying = false;
}

// Global click event listener
window.addEventListener('click', (e) => {
  const footer = document.querySelector('.horizontal-footer');

  // Ignore clicks inside the button group (Clear All / About) OR inside the footer
  if (
    (buttonGroup && buttonGroup.contains(e.target)) ||
    (footer && footer.contains(e.target))
  ) {
    return;
  }

  // Cap at 99 stars
  const existingStars = document.querySelectorAll('.star');
  if (existingStars.length >= 99) {
    return;
  }

  // Create star image element
  const star = document.createElement('img');
  star.className = 'star';
  star.src = STAR_IMAGE_FILENAME;
  star.alt = 'Star';
  star.style.left = `${e.pageX}px`;
  star.style.top = `${e.pageY}px`;

  document.body.appendChild(star);
  playStarSound();

  // Check total count after placing the new star
  const updatedStarCount = document.querySelectorAll('.star').length;
  
  // Start background music after placing more than 5 stars
  if (updatedStarCount > 5 && !isMusicPlaying) {
    startMusic();
  }
});

// Clear all stars
clearBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevents placing a star under the button
  const stars = document.querySelectorAll('.star');
  stars.forEach((star) => star.remove());
  
  stopMusic();
  playStarSound();
});