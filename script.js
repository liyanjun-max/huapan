// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Form submit (bind only if form exists)
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '提交中…';
    }

    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      interest: form.interest.value,
      visitDate: form.visitDate.value
    };

    // Save to localStorage as lead record
    const leads = JSON.parse(localStorage.getItem('huapan_leads') || '[]');
    leads.push({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem('huapan_leads', JSON.stringify(leads));

    // Show success
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }, 600);
  });
}

// Smooth scroll to #contact with offset for fixed nav
const navEl = document.getElementById('nav');
const getNavHeight = () => (navEl ? navEl.offsetHeight : 0);

const contactAnchors = document.querySelectorAll('a[href="#contact"]');
if (contactAnchors.length) {
  const scrollToContact = (e) => {
    if (e) e.preventDefault();
    const target = document.getElementById('contact');
    if (!target) return;
    const offset = getNavHeight() + 10; // 10px spacing
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    if (history.replaceState) history.replaceState(null, '', '#contact');
  };

  contactAnchors.forEach(anchor => {
    anchor.addEventListener('click', scrollToContact, { passive: false });
    anchor.addEventListener('pointerup', scrollToContact, { passive: false });
    anchor.addEventListener('touchend', scrollToContact, { passive: false });
  });
}
