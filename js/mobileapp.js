 // Reveal feature boxes on scroll
    const features = document.querySelectorAll(".feature-box");
    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      features.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          box.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Floating button click
    document.getElementById("floatingBtn").addEventListener("click", () => {
      document.querySelector(".download-buttons").scrollIntoView({ behavior: "smooth" });
    });