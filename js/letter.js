/* ==============================
   1. Letter Configuration
============================== */

const LETTER_CONFIG = {
  greeting: "To my beautiful girl,",
  message: `Happy Birthday to the most special person in my life.

Ich hoffe, dass dir das neue Lebensjahr all das Glück bringt, das dein Herz verdient.
Danke, dass du ein Teil meines Lebens bist, für jedes Lächeln, jedes Gespräch und jede schöne Erinnerung, die wir zusammen gemacht haben.

Ich möchte, dass du weißt, dass du mir sehr viel bedeutest. Ich bin dankbar für jeden Moment, den wir zusammen verbringen.

Ich hoffe, dass wir noch viele Geburtstage zusammen feiern, viele weitere Erinnerungen schaffen und uns jeden einzelnen Tag immer wieder füreinander entscheiden.
Du verdienst all die Liebe und das Glück auf der Welt.

Alles Gute zum Geburtstag, meine Liebe. ♡`,

  signature: "Forever yours ♡",
};

/* ==============================
   2. DOM Elements
============================== */

const envelope = document.getElementById("envelope");
const envelopeHint = document.getElementById("envelope-hint");

const letterPaper = document.getElementById("letter-paper");
const greetingElement = document.getElementById("letter-greeting");
const messageElement = document.getElementById("letter-message");
const signatureElement = document.getElementById("letter-signature");

const replayButton = document.getElementById("replay-button");

/* ==============================
   3. Application State
============================== */

let isOpened = false;
let typingTimer = null;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

/* ==============================
   4. Typewriter Effect
============================== */

function typeWriter(text, element, speed = 35) {
  clearTimeout(typingTimer);

  element.textContent = "";

  // Show the whole message when reduced motion is preferred
  if (prefersReducedMotion.matches) {
    element.textContent = text;
    return;
  }

  let index = 0;

  function typeNextCharacter() {
    if (index >= text.length) {
      return;
    }

    element.textContent += text[index];

    index++;

    typingTimer = setTimeout(typeNextCharacter, speed);
  }

  typeNextCharacter();
}

/* ==============================
   5. Display Letter
============================== */

function displayLetter() {
  greetingElement.textContent = LETTER_CONFIG.greeting;

  signatureElement.textContent = LETTER_CONFIG.signature;

  typeWriter(LETTER_CONFIG.message, messageElement, 35);
}

/* ==============================
   6. Open Envelope
============================== */

function openEnvelope() {
  if (isOpened) return;

  isOpened = true;

  envelope.classList.add("is-open");
  envelope.setAttribute("aria-expanded", "true");

  envelopeHint.textContent = "A message from my heart ♡";

  // Wait for the envelope opening animation
  setTimeout(
    () => {
      letterPaper.hidden = false;

      displayLetter();

      replayButton.hidden = false;

      letterPaper.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "start",
      });
    },
    prefersReducedMotion.matches ? 0 : 900,
  );
}

/* ==============================
   7. Replay Letter
============================== */

function replayLetter() {
  displayLetter();
}

/* ==============================
   8. Event Listeners
============================== */

function handleEvents() {
  // Mouse click
  envelope.addEventListener("click", openEnvelope);

  // Keyboard: Enter or Space
  envelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openEnvelope();
    }
  });

  // Replay
  replayButton.addEventListener("click", replayLetter);
}

/* ==============================
   9. Initialize
============================== */

function initLetterPage() {
  handleEvents();
}

initLetterPage();
