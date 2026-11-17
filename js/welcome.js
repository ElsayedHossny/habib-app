/* =================================
   1. DOM Elements
================================= */

const starsContainer = document.getElementById("starsContainer");
const startButton = document.getElementById("startButton");

/* =================================
   2. Create Stars
================================= */

function createStars(count = 80) {
  if (!starsContainer) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");

    star.classList.add("star");

    // Random Properties
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;

    // Apply CSS Variables
    star.style.setProperty("--star-size", `${size}px`);
    star.style.setProperty("--star-left", `${left}%`);
    star.style.setProperty("--star-top", `${top}%`);
    star.style.setProperty("--star-duration", `${duration}s`);
    star.style.setProperty("--star-delay", `${delay}s`);

    fragment.appendChild(star);
  }

  starsContainer.appendChild(fragment);
}

/* =================================
   3. Start Button Interaction
================================= */

function handleStartButton() {
  if (!startButton) return;

  startButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Prevent Multiple Clicks
    if (startButton.classList.contains("is-loading")) return;

    startButton.classList.add("is-loading");

    startButton.innerHTML = `
            <span>Preparing Your Surprise...</span>
            <span class="button-icon">✦</span>
        `;

    // Navigate to Surprise Page
    setTimeout(() => {
      window.location.href = startButton.href;
    }, 800);
  });
}

/* =================================
   4. Initialize Welcome Page
================================= */

function initWelcomePage() {
  createStars(80);

  handleStartButton();
}

// Run
document.addEventListener("DOMContentLoaded", initWelcomePage);
