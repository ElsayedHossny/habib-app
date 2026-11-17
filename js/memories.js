/* ==============================
   1. Memories Data
============================== */

const memories = [
  {
    id: 1,
    src: "assets/images/memories/memory-01.JPG",
    category: "together",
    title: "A beautiful day",
    date: "Our special day",
    description: "One of those moments I wish I could live again.",
  },

  {
    id: 2,
    src: "assets/images/memories/memory-02.JPG",
    category: "her",
    title: "My favorite smile",
    date: "A lovely memory",
    description: "Your smile will always be my favorite view.",
  },

  {
    id: 3,
    src: "assets/images/memories/memory-03.JPG",
    category: "special",
    title: "A moment to remember",
    date: "A special occasion",
    description: "A little moment that means so much to me.",
  },

  {
    id: 4,
    src: "assets/images/memories/memory-04.jpg",
    category: "together",
    title: "Just us",
    date: "One of our days",
    description: "Anywhere is a beautiful place when I'm with you.",
  },

  {
    id: 5,
    src: "assets/images/memories/memory-05.JPG",
    category: "her",
    title: "Simply beautiful",
    date: "A favorite memory",
    description: "There are a million reasons to adore you.",
  },

  {
    id: 6,
    src: "assets/images/memories/memory-06.JPG",
    category: "special",
    title: "Forever in my heart",
    date: "A day I'll never forget",
    description: "Some memories become a part of who we are.",
  },
];

/* ==============================
   2. DOM Elements
============================== */

const memoriesGrid = document.getElementById("memories-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const photoCount = document.getElementById("photo-count");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDate = document.getElementById("lightbox-date");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxCounter = document.getElementById("lightbox-counter");

const closeButton = document.getElementById("lightbox-close");
const prevButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

/* ==============================
   3. Application State
============================== */

let currentFilter = "all";
let visibleMemories = [];
let currentImageIndex = 0;
let lastFocusedElement = null;

/* ==============================
   4. Filter Memories
============================== */

function getFilteredMemories() {
  if (currentFilter === "all") {
    return memories;
  }

  return memories.filter((memory) => {
    return memory.category === currentFilter;
  });
}

/* ==============================
   5. Render Gallery
============================== */

function renderMemories() {
  visibleMemories = getFilteredMemories();

  memoriesGrid.innerHTML = "";

  photoCount.textContent = `${visibleMemories.length} beautiful moments`;

  if (visibleMemories.length === 0) {
    memoriesGrid.innerHTML = `
      <p class="empty-gallery">No memories found in this category.</p>
    `;

    return;
  }

  visibleMemories.forEach((memory, index) => {
    const card = document.createElement("article");

    card.className = "memory-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open memory: ${memory.title}`);

    const image = document.createElement("img");

    image.src = memory.src;
    image.alt = memory.title;
    image.loading = "lazy";

    const info = document.createElement("div");
    info.className = "memory-card-info";

    const title = document.createElement("h3");
    title.textContent = memory.title;

    const date = document.createElement("span");
    date.textContent = memory.date;

    info.append(title, date);
    card.append(image, info);

    card.addEventListener("click", () => {
      openLightbox(index, card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index, card);
      }
    });

    memoriesGrid.appendChild(card);
  });
}

/* ==============================
   6. Filter Button Events
============================== */

function handleFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      renderMemories();
    });
  });
}

/* ==============================
   7. Open Lightbox
============================== */

function openLightbox(index, triggerElement) {
  if (visibleMemories.length === 0) return;

  currentImageIndex = index;
  lastFocusedElement = triggerElement;

  updateLightbox();

  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  closeButton.focus();
}

/* ==============================
   8. Update Lightbox Content
============================== */

function updateLightbox() {
  const memory = visibleMemories[currentImageIndex];

  if (!memory) return;

  lightboxImage.src = memory.src;
  lightboxImage.alt = memory.title;

  lightboxTitle.textContent = memory.title;
  lightboxDate.textContent = memory.date;
  lightboxDescription.textContent = memory.description;

  lightboxCounter.textContent = `${currentImageIndex + 1} / ${visibleMemories.length}`;

  const hasMultipleImages = visibleMemories.length > 1;

  prevButton.hidden = !hasMultipleImages;
  nextButton.hidden = !hasMultipleImages;
}

/* ==============================
   9. Next & Previous
============================== */

function showNextImage() {
  if (visibleMemories.length <= 1) return;

  currentImageIndex = (currentImageIndex + 1) % visibleMemories.length;

  updateLightbox();
}

function showPreviousImage() {
  if (visibleMemories.length <= 1) return;

  currentImageIndex =
    (currentImageIndex - 1 + visibleMemories.length) % visibleMemories.length;

  updateLightbox();
}

/* ==============================
   10. Close Lightbox
============================== */

function closeLightbox() {
  if (lightbox.hidden) return;

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.src = "";
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/* ==============================
   11. Lightbox Events
============================== */

function handleLightboxEvents() {
  closeButton.addEventListener("click", closeLightbox);

  nextButton.addEventListener("click", showNextImage);

  prevButton.addEventListener("click", showPreviousImage);

  // Close when clicking the dark background
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }
  });
}

/* ==============================
   12. Initialize Application
============================== */

function initMemoriesPage() {
  renderMemories();
  handleFilters();
  handleLightboxEvents();
}

initMemoriesPage();
