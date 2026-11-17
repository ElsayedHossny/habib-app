/* =================================
   1. DOM Elements
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

/* =================================
   2. Toggle Navigation
================================= */

function toggleNavigation() {
  if (!menuToggle || !navLinks) return;

  const isOpen = navLinks.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

/* =================================
   3. Close Navigation
================================= */

function closeNavigation() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("is-open");

  menuToggle.setAttribute("aria-expanded", "false");
}

/* =================================
   4. Navigation Events
================================= */

function handleNavigation() {
  if (!menuToggle || !navLinks) return;

  // Open / Close Menu
  menuToggle.addEventListener("click", toggleNavigation);

  // Close menu after clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeNavigation();
    }
  });
}

/* =================================
   5. Initialize Home Page
================================= */

function initHomePage() {
  handleNavigation();
}

// Run
document.addEventListener("DOMContentLoaded", initHomePage);
