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

// Form submit
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = '提交中…';

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
    success.classList.add('show');
  }, 600);
});
