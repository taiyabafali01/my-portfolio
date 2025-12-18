document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Auto-update footer year
     ========================= */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
     Smooth scrolling (nav + buttons)
     ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.pushState(null, "", targetId);
    });
  });

  /* =========================
     Back-to-top button
     ========================= */
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    const toggleButton = () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleButton);
    toggleButton();

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================
     Reveal sections on scroll
     ========================= */
  const sections = document.querySelectorAll("section");
  sections.forEach(section => section.classList.add("reveal"));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.12
  });

  sections.forEach(section => observer.observe(section));

  /* =========================
     Active nav link highlighting
     ========================= */
  const navLinks = document.querySelectorAll(".main-nav a");

  const setActiveLink = () => {
    let currentSection = "home";
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  };

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  /* =========================
     Contact form validation (extra polish)
     ========================= */
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", e => {
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      const emailValid = /^\S+@\S+\.\S+$/.test(email.value.trim());

      if (!emailValid) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        email.focus();
      }

      if (name.value.trim().length < 2 || message.value.trim().length < 10) {
        e.preventDefault();
        alert("Please fill out all fields before submitting.");
      }
    });
  }

});
