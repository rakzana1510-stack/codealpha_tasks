/**
 * LUMINA GALLERY - JAVASCRIPT
 * CodeAlpha Frontend Development Internship Project
 * 
 * Features:
 * - Gallery data metadata array (Nature, Architecture, People, Animals)
 * - Dynamic card rendering with responsive layout and image error handling
 * - Interactive category filtering with real-time count updates
 * - Full-featured Lightbox viewer with Next/Prev cycling through filtered subset
 * - Keyboard navigation (Escape, ArrowLeft, ArrowRight) & touch swipe gestures
 * - Scroll locking and focus management for accessibility
 * - Responsive mobile navigation toggle
 */

'use strict';

/* ==========================================================================
   1. Gallery Image Metadata (Single Data Source)
   ========================================================================== */
const galleryData = [
  // --- Nature Category (5 images) ---
  {
    id: 1,
    title: 'Misty Pine Forest',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Morning mist rising through towering evergreen pine trees in an alpine forest'
  },
  {
    id: 2,
    title: 'Alpine Sunset Glow',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sunlight illuminating rugged snow-dusted mountain peaks at twilight'
  },
  {
    id: 3,
    title: 'Cascading Turquoise Falls',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Powerful waterfall plunging into a turquoise canyon pool surrounded by lush cliffs'
  },
  {
    id: 4,
    title: 'Tropical Coastal Horizon',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Gentle ocean waves washing along a pristine sandy beach at peaceful dusk'
  },
  {
    id: 5,
    title: 'Yosemite Valley Mist',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Iconic granite cliffs and pine forest reflecting in calm mountain waters'
  },

  // --- Architecture Category (5 images) ---
  {
    id: 6,
    title: 'Geometric Spiral',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dramatic architectural view looking down a clean minimalist spiral staircase'
  },
  {
    id: 7,
    title: 'Metropolis High-Rise',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern glass skyscraper reflecting geometric afternoon clouds and sky'
  },
  {
    id: 8,
    title: 'Minimalist Urban Arch',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
    alt: 'Crisp architectural shadows and geometric angles across modern white building walls'
  },
  {
    id: 9,
    title: 'Gothic Cathedral Vaults',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Historic gothic cathedral showing soaring stone arches and ribbed ceiling vaults'
  },
  {
    id: 10,
    title: 'Futuristic Linear Facade',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
    alt: 'Innovative contemporary building facade with diagonal wooden slats and glass panels'
  },

  // --- People Category (5 images) ---
  {
    id: 11,
    title: 'Studio Shadow & Light',
    category: 'People',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Studio portrait of a woman framed by artistic soft lighting and deep shadows'
  },
  {
    id: 12,
    title: 'Thoughtful Contemplation',
    category: 'People',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Expressive black-and-white portrait of a man looking forward with emotional depth'
  },
  {
    id: 13,
    title: 'Golden Hour Radiance',
    category: 'People',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm smiling portrait of a woman bathed in natural golden hour sunlight'
  },
  {
    id: 14,
    title: 'Urban Creative Expression',
    category: 'People',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Joyful close-up portrait of a man smiling warmly against an urban setting'
  },
  {
    id: 15,
    title: 'Urban Street Serenade',
    category: 'People',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Candid lifestyle portrait of a young woman outdoors in soft evening ambience'
  },

  // --- Animals Category (5 images) ---
  {
    id: 16,
    title: 'Apex Lion in Savanna',
    category: 'Animals',
    url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Close portrait of a proud male lion resting peacefully on open savanna grasslands'
  },
  {
    id: 17,
    title: 'Crimson Wild Fox',
    category: 'Animals',
    url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Wild red fox with vibrant fur perched attentively on a mossy green meadow'
  },
  {
    id: 18,
    title: 'Golden Eagle Glider',
    category: 'Animals',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    alt: 'Majestic golden eagle spreading expansive wings in flight across clear mountain skies'
  },
  {
    id: 19,
    title: 'Desert Wild Stallion',
    category: 'Animals',
    url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dynamic shot of a strong wild horse galloping across wide open golden terrain'
  },
  {
    id: 20,
    title: 'Bengal Tiger Stare',
    category: 'Animals',
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Intense close-up photograph of a Bengal tiger with striking amber eyes in natural light'
  }
];

/* Graceful Fallback SVG (data URI) for offline or failed image requests */
const FALLBACK_IMAGE_DATA_URI = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="#171b24">
  <rect width="800" height="600" fill="#171b24"/>
  <rect x="40" y="40" width="720" height="520" rx="12" fill="none" stroke="#2a303f" stroke-width="2" stroke-dasharray="8 8"/>
  <circle cx="400" cy="270" r="48" fill="#2a303f"/>
  <path d="M400 242a28 28 0 100 56 28 28 0 000-56zm-18 28a18 18 0 1136 0 18 18 0 01-36 0z" fill="#e5a93c"/>
  <text x="400" y="370" fill="#94a3b8" font-family="sans-serif" font-size="20" font-weight="600" text-anchor="middle">Image Temporarily Unavailable</text>
  <text x="400" y="405" fill="#64748b" font-family="sans-serif" font-size="14" text-anchor="middle">Lumina Gallery Curated Collection</text>
</svg>
`);

/* ==========================================================================
   2. Application State
   ========================================================================== */
const state = {
  activeCategory: 'All',
  visibleImages: [...galleryData],
  currentLightboxIndex: 0,
  isLightboxOpen: false,
  lastFocusedElement: null
};

/* ==========================================================================
   3. DOM Elements
   ========================================================================== */
const elements = {
  galleryGrid: document.getElementById('gallery-grid'),
  galleryCounter: document.getElementById('gallery-counter'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  navToggle: document.getElementById('nav-toggle'),
  primaryNav: document.getElementById('primary-nav'),
  navLinks: document.querySelectorAll('.nav-link'),

  // Lightbox elements
  lightbox: document.getElementById('lightbox'),
  lightboxBackdrop: document.getElementById('lightbox-backdrop'),
  lightboxCloseBtn: document.getElementById('lightbox-close'),
  lightboxPrevBtn: document.getElementById('lightbox-prev'),
  lightboxNextBtn: document.getElementById('lightbox-next'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxSpinner: document.getElementById('lightbox-spinner'),
  lightboxCounter: document.getElementById('lightbox-counter'),
  lightboxTitle: document.getElementById('lightbox-title'),
  lightboxCategory: document.getElementById('lightbox-category')
};

/* ==========================================================================
   4. Gallery Card Rendering
   ========================================================================== */

/**
 * Creates an individual gallery card DOM element.
 * @param {Object} item - Image metadata object
 * @returns {HTMLElement} card element
 */
function createGalleryCard(item) {
  const card = document.createElement('article');
  card.className = 'gallery-card fade-in';
  card.dataset.id = item.id;
  card.dataset.category = item.category;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${item.title} (${item.category}) in lightbox`);

  card.innerHTML = `
    <div class="gallery-card-img-container">
      <img 
        src="${item.url}" 
        alt="${item.alt}" 
        class="gallery-card-img" 
        loading="lazy"
        width="600" 
        height="450"
      >
    </div>
    <div class="gallery-card-overlay">
      <div class="card-overlay-top">
        <span class="card-zoom-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </span>
      </div>
      <div class="card-overlay-details">
        <span class="card-category-label">${item.category}</span>
        <h3 class="card-title">${item.title}</h3>
      </div>
    </div>
  `;

  // Graceful fallback if image fails to load
  const imgElement = card.querySelector('.gallery-card-img');
  imgElement.addEventListener('error', function onImageError() {
    this.src = FALLBACK_IMAGE_DATA_URI;
    this.alt = `${item.title} (Fallback Placeholder)`;
  }, { once: true });

  // Open lightbox on card click
  card.addEventListener('click', () => {
    openLightboxByImageId(item.id, card);
  });

  // Open lightbox on Enter or Space key
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightboxByImageId(item.id, card);
    }
  });

  return card;
}

/**
 * Renders all gallery cards from the metadata list into the gallery grid.
 */
function renderGallery() {
  if (!elements.galleryGrid) return;
  elements.galleryGrid.innerHTML = '';

  const fragment = document.createDocumentFragment();
  galleryData.forEach((item) => {
    const card = createGalleryCard(item);
    fragment.appendChild(card);
  });

  elements.galleryGrid.appendChild(fragment);
  updateCounterDisplay();
}

/* ==========================================================================
   5. Category Filtering
   ========================================================================== */

/**
 * Filters visible gallery cards by category and updates counter & button states.
 * @param {string} category - Category to filter by ("All", "Nature", etc.)
 */
function filterGallery(category) {
  state.activeCategory = category;

  // Update visible images array for lightbox navigation
  if (category === 'All') {
    state.visibleImages = [...galleryData];
  } else {
    state.visibleImages = galleryData.filter((img) => img.category.toLowerCase() === category.toLowerCase());
  }

  // Update button active states and aria attributes
  elements.filterButtons.forEach((btn) => {
    const btnCategory = btn.dataset.category;
    const isActive = btnCategory.toLowerCase() === category.toLowerCase();
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Animate and toggle cards in the grid
  const allCards = elements.galleryGrid.querySelectorAll('.gallery-card');
  allCards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const isVisible = (category === 'All' || cardCategory.toLowerCase() === category.toLowerCase());

    if (isVisible) {
      card.classList.remove('hidden');
      // Trigger smooth fade-in
      requestAnimationFrame(() => {
        card.classList.remove('fade-out');
        card.classList.add('fade-in');
      });
    } else {
      card.classList.remove('fade-in');
      card.classList.add('fade-out');
      // Hide from layout after transition completes
      setTimeout(() => {
        if (card.classList.contains('fade-out')) {
          card.classList.add('hidden');
        }
      }, 200);
    }
  });

  // Update counter text
  updateCounterDisplay();
}

/**
 * Updates the visible image count indicator text.
 */
function updateCounterDisplay() {
  if (!elements.galleryCounter) return;

  const total = galleryData.length;
  const count = state.visibleImages.length;

  if (state.activeCategory === 'All') {
    elements.galleryCounter.textContent = `Showing ${count} photographs`;
  } else {
    elements.galleryCounter.textContent = `Showing ${count} of ${total} photographs (${state.activeCategory})`;
  }
}

/* ==========================================================================
   6. Lightbox Viewer
   ========================================================================== */

/**
 * Opens the lightbox for a specific image ID.
 * Finds the index within the CURRENTLY VISIBLE filtered images array.
 * @param {number} imageId - ID of image to display
 * @param {HTMLElement} triggerElement - Element that triggered opening
 */
function openLightboxByImageId(imageId, triggerElement) {
  state.lastFocusedElement = triggerElement || document.activeElement;

  const visibleIndex = state.visibleImages.findIndex((item) => item.id === imageId);

  if (visibleIndex === -1) {
    // Fallback if somehow not found in filtered list
    state.currentLightboxIndex = 0;
  } else {
    state.currentLightboxIndex = visibleIndex;
  }

  displayLightboxImage(state.currentLightboxIndex);

  // Activate lightbox overlay
  elements.lightbox.classList.add('active');
  elements.lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  state.isLightboxOpen = true;

  // Move focus to close button for keyboard accessibility
  elements.lightboxCloseBtn.focus();
}

/**
 * Updates the lightbox display with the image at the given index.
 * @param {number} index - Index inside state.visibleImages
 */
function displayLightboxImage(index) {
  if (!state.visibleImages.length) return;

  // Bounds wrap-around
  if (index < 0) {
    index = state.visibleImages.length - 1;
  } else if (index >= state.visibleImages.length) {
    index = 0;
  }
  state.currentLightboxIndex = index;

  const currentItem = state.visibleImages[index];
  const total = state.visibleImages.length;

  // Show loading spinner while high-res loads
  elements.lightboxSpinner.classList.add('active');
  elements.lightboxImg.classList.add('loading');

  // Update counter in two-digit format: e.g. "03 / 16"
  const formattedCurrent = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');
  elements.lightboxCounter.textContent = `${formattedCurrent} / ${formattedTotal}`;

  // Update metadata texts
  elements.lightboxTitle.textContent = currentItem.title;
  elements.lightboxCategory.textContent = currentItem.category;

  // Load image
  const tempImg = new Image();
  tempImg.src = currentItem.url;

  tempImg.onload = () => {
    elements.lightboxImg.src = currentItem.url;
    elements.lightboxImg.alt = currentItem.alt;
    elements.lightboxSpinner.classList.remove('active');
    elements.lightboxImg.classList.remove('loading');
  };

  tempImg.onerror = () => {
    elements.lightboxImg.src = FALLBACK_IMAGE_DATA_URI;
    elements.lightboxImg.alt = `${currentItem.title} (Fallback Placeholder)`;
    elements.lightboxSpinner.classList.remove('active');
    elements.lightboxImg.classList.remove('loading');
  };
}

/**
 * Navigates to the previous visible image in the lightbox.
 */
function navigateLightboxPrev() {
  if (!state.isLightboxOpen) return;
  displayLightboxImage(state.currentLightboxIndex - 1);
}

/**
 * Navigates to the next visible image in the lightbox.
 */
function navigateLightboxNext() {
  if (!state.isLightboxOpen) return;
  displayLightboxImage(state.currentLightboxIndex + 1);
}

/**
 * Closes the lightbox and restores background scrolling and focus.
 */
function closeLightbox() {
  if (!state.isLightboxOpen) return;

  elements.lightbox.classList.remove('active');
  elements.lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  state.isLightboxOpen = false;

  // Reset image src to free memory
  elements.lightboxImg.src = '';

  // Restore focus to element that triggered the modal
  if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
    state.lastFocusedElement.focus();
  }
}

/* ==========================================================================
   7. Touch Gesture Support (Swipe left/right on Mobile)
   ========================================================================== */
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function setupTouchGestures() {
  const stage = elements.lightbox.querySelector('.lightbox-stage');
  if (!stage) return;

  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipeGesture();
    }
  }, { passive: true });
}

function handleSwipeGesture() {
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;
  const minSwipeDistance = 45;

  // Ensure horizontal swipe is dominant
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
    if (diffX < 0) {
      // Swiped Left -> Next image
      navigateLightboxNext();
    } else {
      // Swiped Right -> Previous image
      navigateLightboxPrev();
    }
  }
}

/* ==========================================================================
   8. Event Listeners & Interactions
   ========================================================================== */

function initializeEventListeners() {
  // Category Filter buttons
  elements.filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      filterGallery(category);
    });
  });

  // Lightbox Close controls
  elements.lightboxCloseBtn.addEventListener('click', closeLightbox);
  elements.lightboxBackdrop.addEventListener('click', closeLightbox);

  // Lightbox Navigation controls
  elements.lightboxPrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightboxPrev();
  });

  elements.lightboxNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightboxNext();
  });

  // Global Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (!state.isLightboxOpen) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightboxPrev();
    } else if (e.key === 'ArrowRight') {
      navigateLightboxNext();
    }
  });

  // Mobile Hamburger Navigation Toggle
  if (elements.navToggle && elements.primaryNav) {
    elements.navToggle.addEventListener('click', () => {
      const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
      elements.navToggle.setAttribute('aria-expanded', String(!isExpanded));
      elements.navToggle.classList.toggle('open', !isExpanded);
      elements.primaryNav.classList.toggle('open', !isExpanded);
      document.body.classList.toggle('menu-open', !isExpanded);
    });

    // Close mobile menu on clicking any navigation link
    elements.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        elements.navToggle.setAttribute('aria-expanded', 'false');
        elements.navToggle.classList.remove('open');
        elements.primaryNav.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Setup mobile swipe handlers for lightbox
  setupTouchGestures();
}

/* ==========================================================================
   9. Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initializeEventListeners();
});
