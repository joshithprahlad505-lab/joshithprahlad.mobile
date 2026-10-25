const body = document.body;
const header = document.querySelector('.topbar');
const progress = document.querySelector('.top-progress span');
const dialog = document.querySelector('.entry-dialog');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updatePageReadout() {
  header.classList.toggle('scrolled', window.scrollY > 12);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener('scroll', updatePageReadout, { passive: true });
updatePageReadout();

document.querySelectorAll('.skills-track').forEach(skillsTrack => {
  const skillsGroup = skillsTrack.querySelector('.skills-group');
  if (!skillsGroup) return;
  const skillsClone = skillsGroup.cloneNode(true);
  skillsClone.setAttribute('aria-hidden', 'true');
  skillsTrack.append(skillsClone);
});

const revealItems = document.querySelectorAll('.reveal');
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

document.querySelectorAll('.mission-entry').forEach(entry => {
  entry.addEventListener('click', () => {
    document.querySelector('#entry-title').textContent = entry.dataset.name;
    document.querySelector('#entry-type').textContent = entry.dataset.type;
    document.querySelector('#entry-goal').textContent = entry.dataset.goal;
    document.querySelector('#entry-approach').textContent = entry.dataset.approach;
    document.querySelector('#entry-outcome').textContent = entry.dataset.outcome;
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && dialog.open) dialog.close();
});
