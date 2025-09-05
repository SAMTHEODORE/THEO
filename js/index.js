 const solutionToggle = document.getElementById("solutionToggle");
        const solutionPanel = document.getElementById("solutionPanel");
        solutionToggle.onclick = (e) => {
          e.preventDefault();
          solutionPanel.classList.toggle("visible");
        };
        window.addEventListener("click", (e) => {
          if (!solutionPanel.contains(e.target) && e.target !== solutionToggle) {
            solutionPanel.classList.remove("visible");
          }
        });

const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const modal = document.getElementById("demoModal");
    openModalBtn.onclick = () => modal.style.display = "block";
    closeModalBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };