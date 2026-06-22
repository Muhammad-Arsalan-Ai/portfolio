(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const yearEl = document.getElementById("year");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  window.addEventListener(
    "scroll",
    () => header.classList.toggle("scrolled", window.scrollY > 20),
    { passive: true }
  );

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    }
  });

  /* Project filter */
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });

      workCards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === "all" || category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* Active nav on scroll */
  const sections = document.querySelectorAll("section[id]");
  const navItems = navLinks.querySelectorAll("a[href^='#']");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((link) => {
            link.style.color =
              link.getAttribute("href") === `#${id}` ? "var(--text)" : "";
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  /* Fade-in */
  const fadeEls = document.querySelectorAll(
    ".work-card, .exp-card, .skill-group, .contact-box, .resume-card"
  );

  fadeEls.forEach((el) => el.classList.add("fade-in"));

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  fadeEls.forEach((el) => fadeObserver.observe(el));

  /* Back to top */
  const backToTopBtn = document.getElementById("back-to-top");
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("top")?.focus({ preventScroll: true });
  };

  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTop();
    });
  });

  if (backToTopBtn) {
    backToTopBtn.removeAttribute("hidden");
    backToTopBtn.addEventListener("click", scrollToTop);

    window.addEventListener(
      "scroll",
      () => {
        backToTopBtn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true }
    );
  }
})();
