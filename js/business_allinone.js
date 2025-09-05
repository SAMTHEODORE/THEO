const buttons = document.querySelectorAll('.menu button');
  const sections = document.querySelectorAll('.product-section');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(button.dataset.section).classList.add('active');
    });
  });

  // Show All-in-One Desktop by default
  buttons[0].click();