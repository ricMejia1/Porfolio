function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Add scroll animations
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");

  function checkVisibility() {
    const triggerBottom = window.innerHeight / 5 * 4;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility(); // Initial check
});
