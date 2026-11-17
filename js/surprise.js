/* =================================
   1. Birthday Configuration
================================= */

const BIRTHDAY_CONFIG = {
  name: "Your Beautiful Name",

  message: `
        You make this world a more beautiful place.
        I hope your day is as wonderful as you are.
        You deserve all the happiness in the universe. ❤️
    `,
};

/* =================================
   2. DOM Elements
================================= */

const giftButton = document.getElementById("giftButton");
const giftStage = document.getElementById("giftStage");

const birthdayReveal = document.getElementById("birthdayReveal");
const birthdayName = document.getElementById("birthdayName");
const birthdayMessage = document.getElementById("birthdayMessage");

const giftInstruction = document.getElementById("giftInstruction");
const confettiContainer = document.getElementById("confettiContainer");

/* =================================
   3. Update Birthday Information
================================= */

function updateBirthdayContent() {
  birthdayName.textContent = BIRTHDAY_CONFIG.name;
  birthdayMessage.textContent = BIRTHDAY_CONFIG.message;
}

/* =================================
   4. Create Confetti
================================= */

function createConfetti(count = 100) {
  const colors = [
    "#F5C8E9",
    "#D5A9ED",
    "#F6D8A8",
    "#FFFFFF",
    "#E8A8C9",
    "#BDA4E8",
  ];

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");

    piece.classList.add("confetti");

    // Random Properties
    const left = Math.random() * 100;
    const width = Math.random() * 7 + 4;
    const height = Math.random() * 10 + 5;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random() * 2;

    const color = colors[Math.floor(Math.random() * colors.length)];

    // CSS Variables
    piece.style.setProperty("--confetti-left", `${left}%`);
    piece.style.setProperty("--confetti-width", `${width}px`);
    piece.style.setProperty("--confetti-height", `${height}px`);
    piece.style.setProperty("--confetti-duration", `${duration}s`);
    piece.style.setProperty("--confetti-color", color);

    piece.style.animationDelay = `${delay}s`;

    fragment.appendChild(piece);
  }

  confettiContainer.appendChild(fragment);
}

/* =================================
   5. Open Gift
================================= */

function openGift() {
  if (giftButton.disabled) return;

  // Prevent Multiple Clicks
  giftButton.disabled = true;

  // Start Gift Animation
  giftButton.classList.add("is-open");

  // Update Instruction
  giftInstruction.textContent = "A little happiness is on its way...";

  // Create Confetti
  createConfetti(100);

  // Show Birthday Message
  setTimeout(() => {
    giftStage.classList.add("is-hidden");

    birthdayReveal.hidden = false;
  }, 1300);
}

/* =================================
   6. Initialize Surprise Page
================================= */

function initSurprisePage() {
  updateBirthdayContent();

  if (giftButton) {
    giftButton.addEventListener("click", openGift);
  }
}

/* =================================
   7. Run Application
================================= */

document.addEventListener("DOMContentLoaded", initSurprisePage);
