/* ==============================
   1. Timeline Data
============================== */

const timelineEvents = [
  {
    id: 1,
    date: "The beginning",
    title: "Our First Hello",
    image: "assets/images/timeline/moment-01.jpg",
    description:
      "Every beautiful story has a beginning. And I'm so glad ours started.",
  },

  {
    id: 2,
    date: "A special day",
    title: "The First Memory",
    image: "assets/images/timeline/moment-02.jpg",
    description: "A moment that became one of my favorite memories with you.",
  },

  {
    id: 3,
    date: "A beautiful chapter",
    title: "Getting Closer",
    image: "assets/images/timeline/moment-03.jpg",
    description:
      "With every conversation and every moment, you became more special to me.",
  },

  {
    id: 4,
    date: "Forever starts here",
    title: "Our Engagement",
    image: "assets/images/timeline/moment-04.jpg",
    description:
      "A promise, a new chapter, and a future I can't wait to build with you.",
  },
];

/* ==============================
   2. DOM Elements
============================== */

const timelineContainer = document.getElementById("timeline-events");

/* ==============================
   3. Render Timeline
============================== */

function renderTimeline() {
  timelineContainer.innerHTML = "";

  timelineEvents.forEach((event) => {
    const article = document.createElement("article");

    article.className = "timeline-event";

    const date = document.createElement("span");
    date.className = "timeline-date";
    date.textContent = event.date;

    const card = document.createElement("div");
    card.className = "timeline-card";

    const image = document.createElement("img");
    image.src = event.image;
    image.alt = event.title;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "timeline-card-content";

    const title = document.createElement("h3");
    title.textContent = event.title;

    const description = document.createElement("p");
    description.textContent = event.description;

    content.append(title, description);
    card.append(image, content);

    article.append(date, card);

    timelineContainer.appendChild(article);
  });
}

/* ==============================
   4. Scroll Reveal Animation
============================== */

function setupScrollAnimation() {
  const events = document.querySelectorAll(".timeline-event");

  // Fallback for browsers without IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    events.forEach((event) => {
      event.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Stop observing after the event appears
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  events.forEach((event) => {
    observer.observe(event);
  });
}

/* ==============================
   5. Initialize Page
============================== */

function initTimelinePage() {
  renderTimeline();
  setupScrollAnimation();
}

initTimelinePage();
