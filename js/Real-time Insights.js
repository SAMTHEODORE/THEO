// Click / keyboard activation handler for the Real-time Insights card
    (function () {
      const card = document.getElementById('realtime-card');
      const desc = document.getElementById('realtime-desc');

      // The text you requested
      const targetText = "Track income, expenses, and profits with live updates and powerful analytics.";

      // If you want a one-time change or toggle, you can adapt easily.
      function setDescription() {
        desc.textContent = targetText;
        card.setAttribute('aria-pressed', 'true');
        // small animation feedback
        card.animate([
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-6px) scale(1.01)' },
          { transform: 'translateY(0) scale(1)' }
        ], { duration: 260, easing: 'cubic-bezier(.2,.9,.3,1)' });
      }

      // Click
      card.addEventListener('click', setDescription);

      // Keyboard accessibility (Enter / Space)
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setDescription();
        }
      });

      // If the page should already show that text on load (uncomment):
      // setDescription();
    })();