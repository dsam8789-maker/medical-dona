const authForm = document.getElementById('auth-form');
const logoutBtn = document.getElementById('logout');
const authStatus = document.querySelector('.auth-status');

function saveUser(u) {
  localStorage.setItem('mh_user', JSON.stringify(u));
  updateStatus();
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('mh_user') || 'null'); }
  catch { return null; }
}

function updateStatus() {
  const u = getUser();
  authStatus.textContent = u ? `Welcome ${u.username}` : 'Not signed in.';
}

authForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  if (!username || !password) { alert('Please fill in all fields'); return; }
  saveUser({ username, created: Date.now() });
  alert('Signed in successfully (local demo)');
});

logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem('mh_user');
  updateStatus();
  alert('Signed out successfully');
});

updateStatus();
