const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you for your message. We will contact you soon.');
  contactForm.reset();
});

// Save contact messages locally
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const msgs = JSON.parse(localStorage.getItem('mh_messages') || '[]');
    msgs.push({ name, message, time: Date.now() });
    localStorage.setItem('mh_messages', JSON.stringify(msgs));
  });
}

// Theme toggle (light/dark)
const themeToggle = document.getElementById('theme-toggle');
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('mh_theme', t);
  themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
}
const savedTheme = localStorage.getItem('mh_theme') || 'light';
setTheme(savedTheme);
themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
});

const mediaNote = document.getElementById('media-note');
const videoMedia = document.getElementById('health-video');
const audioMedia = document.getElementById('health-audio');

const setMediaMessage = (message) => {
  if (mediaNote) {
    mediaNote.textContent = message;
  }
};

function refreshMediaSources() {
  const timestamp = Date.now();
  const videoSource = document.getElementById('health-video-source');
  if (videoMedia && videoSource && videoSource.dataset.origSrc) {
    videoSource.src = `${videoSource.dataset.origSrc}?cb=${timestamp}`;
    videoMedia.load();
  }

  if (audioMedia) {
    const sources = audioMedia.querySelectorAll('source[data-orig-src]');
    sources.forEach((source) => {
      source.src = `${source.dataset.origSrc}?cb=${timestamp}`;
    });
    audioMedia.load();
  }
}

window.addEventListener('DOMContentLoaded', refreshMediaSources);

if (videoMedia) {
  videoMedia.addEventListener('error', () => {
    const error = videoMedia.error;
    const message = error ? `Video playback error: code ${error.code}` : 'Video playback error detected.';
    setMediaMessage(message);
    console.error('Video playback error', error);
  });
  videoMedia.addEventListener('play', () => {
    setMediaMessage('Video is playing. Check volume controls to hear audio.');
  });
}

if (audioMedia) {
  audioMedia.addEventListener('error', () => {
    const error = audioMedia.error;
    const message = error ? `Audio playback error: code ${error.code}` : 'Audio playback error detected.';
    setMediaMessage(message);
    console.error('Audio playback error', error);
  });
  audioMedia.addEventListener('canplay', () => {
    setMediaMessage('Audio is ready to play. Press play to hear it.');
  });
  audioMedia.addEventListener('play', () => {
    setMediaMessage('Audio playback started.');
  });
}
