document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  let isDark = localStorage.getItem('theme') === 'dark';

  // Set initial theme
  if (isDark) {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Typewriter Effect
  const typewriterText = document.querySelector('.typewriter-text');
  const texts = [
    'Full-Stack Developer',
    'Security Specialist',
    'Problem Solver',
    'Tech Enthusiast'
  ];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentText = texts[index];
    
    if (!isDeleting) {
      typewriterText.textContent = currentText.slice(0, charIndex++);
      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000);
        return;
      }
    } else {
      typewriterText.textContent = currentText.slice(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
      }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
  }
  typeWriter();

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after click
      if (window.innerWidth < 992) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        bootstrap.Collapse.getInstance(navbarCollapse).hide();
      }
    });
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card-animate, .skill-card, .project-card').forEach(el => {
    fadeObserver.observe(el);
  });

const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.dataset.width;
      const targetPercent = parseInt(targetWidth);
      const duration = 1500; // 1.5 seconds
      let start = null;

      // Reset to 0% initially
      entry.target.style.width = '0%';
      const percentElement = entry.target.closest('.skill-item').querySelector('.skill-percent');
      percentElement.textContent = '0%';

      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min((progress / duration) * targetPercent, targetPercent);
        
        // Update width and text
        entry.target.style.width = `${percentage}%`;
        percentElement.textContent = `${Math.floor(percentage)}%`;

        if (percentage < targetPercent) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

  // Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const formData = new FormData(contactForm);
      fetch('#', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        alert('Message sent successfully!');
        contactForm.reset();
      })
      .catch(error => {
        alert('Error sending message. Please try again.');
      });
    });
  }

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Initialize Tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});