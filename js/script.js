document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Smooth Fade-In on Scroll
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered fade in
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // 2. Image Loading Fallback (Fixed implementation)
  const appImages = document.querySelectorAll('.screenshot-card img');
  appImages.forEach(img => {
    // Listen for actual loading errors from the browser
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.parentElement.querySelector('.screenshot-placeholder');
      if (placeholder) placeholder.style.display = 'flex';
    });
    
    // Only force an error if the browser says it is completely done loading, 
    // BUT the width is still 0 (meaning the file was corrupted or missing)
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });

  // 3. Sticky Navbar & Mobile Menu Logic
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(6,11,24,0.97)';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.background = 'rgba(6,11,24,0.82)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Mobile Menu Toggle
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.contains('active');
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isActive);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
});