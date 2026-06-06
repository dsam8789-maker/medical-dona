function loadMessages() {
  const list = document.getElementById('messages-list');
  const msgs = JSON.parse(localStorage.getItem('mh_messages') || '[]');
  list.innerHTML = '';
  if (!msgs.length) {
    list.innerHTML = '<p>No saved messages.</p>';
    return;
  }
  msgs.reverse().forEach(m => {
    const el = document.createElement('div');
    el.className = 'message-item';
    el.innerHTML = `<strong>${escapeHTML(m.name)}</strong> <small>${new Date(m.time).toLocaleString()}</small><p>${escapeHTML(m.message)}</p>`;
    list.appendChild(el);
  });
}

function escapeHTML(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

document.getElementById('clear-messages').addEventListener('click', () => {
  if (!confirm('Clear all saved messages?')) return;
  localStorage.removeItem('mh_messages');
  loadMessages();
});

loadMessages();
