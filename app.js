// ============================================
// TargetBand9 — Shared UI behavior
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Update nav auth area (login/signup vs account/logout)
  updateNavAuthState();
});

async function updateNavAuthState() {
  const authSlot = document.getElementById('nav-auth-slot');
  const navLinks = document.getElementById('nav-links');
  if (!authSlot || typeof getCurrentUser !== 'function') return;

  const user = await getCurrentUser();
  if (!user) return; // leave default Log in / Sign up buttons

  authSlot.innerHTML = `
    <a href="dashboard.html" class="btn btn-outline btn-sm">My account</a>
    <button onclick="signOut()" class="btn btn-coral btn-sm">Log out</button>
  `;

  const premium = await isPremiumUser();
  if (premium && navLinks) {
    const skillLinks = `
      <li><a href="reading.html">Reading</a></li>
      <li><a href="listening.html">Listening</a></li>
      <li><a href="writing.html">Writing</a></li>
      <li><a href="speaking.html">Speaking</a></li>
    `;
    // Insert skill links right after "Home"
    const homeItem = navLinks.querySelector('li');
    if (homeItem) {
      homeItem.insertAdjacentHTML('afterend', skillLinks);
    }
  }
}
