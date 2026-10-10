# Lumina Gallery

A modern, responsive photography gallery web application developed for the **CodeAlpha Frontend Development Internship**. Lumina Gallery showcases high-resolution photographs with dynamic category filtering, responsive grid layouts, and an immersive, accessible lightbox viewer.

---

## 📸 Overview & Description

**Lumina Gallery** delivers a high-end photography viewing experience with a sleek dark aesthetic, subtle gold accents, and fluid interactions. Built entirely using core web standards without external libraries or frameworks, the project highlights clean architecture, semantic HTML5, responsive CSS3 Grid/Flexbox styling, and modular Vanilla JavaScript.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>` roles), ARIA accessibility attributes (`aria-expanded`, `aria-pressed`, `aria-modal`, `aria-live`).
- **CSS3**: Custom properties (CSS variables), CSS Grid (responsive 4/2/1 columns), Flexbox, fluid typography (`clamp()`), backdrop blur, smooth micro-interactions, and `@media (prefers-reduced-motion)` support.
- **Vanilla JavaScript (ES6+)**: Document Object Model (DOM) manipulation, event handling, dynamic dataset array rendering, keyboard navigation, swipe gestures, and robust scroll/focus locking.

---

## ✨ Features

- **Brand Header & Navigation**:
  - Distinctive "LUMINA" branding with custom photography SVG icon.
  - Smooth scrolling navigation links to the Gallery, Categories, and About sections.
  - Mobile-responsive navigation drawer with an animated hamburger toggle.
- **Hero Showcase**:
  - Compact, typography-driven hero with high-contrast copy: *"Discover Beauty in Every Frame"*.
  - Call-to-action button linking directly to the photography grid.
- **Interactive Category Filtering**:
  - 5 filter controls: `All`, `Nature`, `Architecture`, `People`, `Animals`.
  - Visual active state with gold accents and aria feedback.
  - Real-time visible counter indicator (e.g., *"Showing 20 photographs"* or *"Showing 5 of 20 photographs (Nature)"*).
  - Smooth card transitions.
- **Responsive 20-Photo Grid**:
  - Desktop: 4 columns.
  - Tablet: 2 columns.
  - Mobile: 1–2 columns.
  - Aspect ratio preservation (`4 / 3`) with `object-fit: cover` to eliminate image distortion.
  - Elegant hover state: image zoom, darkened gradient overlay, category tag, and title slide-up.
  - Graceful inline SVG fallback if an external image fails to load.
- **Immersive Lightbox Image Viewer**:
  - Full-screen dark overlay with background backdrop blur.
  - Centered high-resolution image with loading spinner.
  - Image title and category tag.
  - Image counter formatted with leading zeros (e.g., `03 / 16` or `01 / 05`).
  - **Filtered Subset Cycling**: Previous (`‹`) and Next (`›`) controls cycle strictly within the active filtered category.
  - Multiple close methods: Close button (`×`), clicking the backdrop, or pressing the `Escape` key.
  - Full keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).
  - Mobile touch swipe support (swipe left for next, swipe right for previous).
  - Background scroll locking (`body.lightbox-open`) and accessible focus management.
- **About Section**:
  - Concise description highlighting the project's purpose and experience.
- **Refined Minimalist Footer**:
  - Clean attribution: *"Lumina Gallery | Designed & Developed by Rakzana"*.

---

## 📁 Project File Structure

```
codealpha_image_gallery/
│
├── index.html        # Complete semantic HTML structure
├── style.css         # Gallery styling, CSS Grid, dark aesthetic & animations
├── script.js         # Single metadata data array, filtering & lightbox logic
└── README.md         # Project documentation, instructions & details
```

---

## 🚀 Instructions to Run Locally

You do not need to install any packages, build tools, or compilers. The project runs directly in any modern web browser.

### Option 1: Direct File Open
1. Navigate to the project folder:
   ```bash
   cd codealpha_image_gallery
   ```
2. Double-click `index.html` or open it with your preferred browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### Option 2: Local HTTP Server (Recommended)
Running through a local web server provides the best experience for local development:

- **Using Node.js / npx**:
  ```bash
  npx serve codealpha_image_gallery
  # Or:
  npx http-server codealpha_image_gallery
  ```

- **Using Python 3**:
  ```bash
  cd codealpha_image_gallery
  python -m http.server 3000
  ```
  Then visit `http://localhost:3000` in your web browser.

- **Using VS Code Live Server**:
  Right-click `index.html` in VS Code and select **Open with Live Server**.

---

## 🌐 Network Notice

> **Note**: Lumina Gallery uses high-resolution photographs hosted on reliable Unsplash CDN servers. An active internet connection is required to fetch and display the live photographs. If offline, the application gracefully provides built-in placeholder graphics.
