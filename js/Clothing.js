// Smooth scroll to features section
    function scrollToFeatures() {
      document.getElementById('features').scrollIntoView({behavior: 'smooth'});
    }

    // Reveal animation when scrolling
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.feature-box').forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < window.innerHeight - 50) {
          box.classList.add('show');
        }
      });
    });