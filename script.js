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

const contact = document.querySelector('.comms-content');
if (contact) {
  const buttons = [...contact.querySelectorAll('.comms-button')];
  const email = buttons.find(button => button.href.includes('mail.google.com'));
  const whatsapp = buttons.find(button => button.href.includes('wa.me'));
  if (email && whatsapp) {
    email.classList.add('email-button');
    const emailLabel = email.querySelector('small');
    if (emailLabel) emailLabel.textContent = 'GMAIL / DIRECT CONTACT';
    const linkedin = document.createElement('a');
    linkedin.className = 'comms-button linkedin-button';
    linkedin.href = 'https://www.linkedin.com/in/joshith-prahlad-bheemaneni-a48589288';
    linkedin.target = '_blank';
    linkedin.rel = 'noopener';
    linkedin.innerHTML = '<span><strong>LinkedIn</strong></span>';
    linkedin.style.background = '#0A66C2';
    linkedin.style.color = '#fff';
    email.before(linkedin);
    whatsapp.classList.add('whatsapp-button');
    whatsapp.querySelector('strong').style.fontSize = '14px';
    whatsapp.querySelector('small').style.fontSize = '7px';
  }
}

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
    document.body.classList.add('dialog-open');
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => {
  dialog.close();
  document.body.classList.remove('dialog-open');
});

