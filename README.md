# Nexus Hub - Frontend SPA 🌐 (CineStream + Community)

A high-fidelity, enterprise-level Single Page Application (SPA) built with React and Vite. This application merges a premium media discovery platform (CineStream) with a full-stack, real-time community forum powered by a custom Node.js/MongoDB REST API.

## Live Deployments

- **Frontend SPA (Vercel):** `https://nexus-hub-backend-mfaq.onrender.com`
- **Backend API (Render):** `https://nexus-hub-frontend-mu.vercel.app`

---

- **Frontend SPA (GITHUB):** `https://github.com/Shivam-hub976/Nexus_Hub-Frontend`
- **Backend API (GITHUB):** `https://github.com/Shivam-hub976/Nexus_Hub-Backend`

## Tech Stack

- **Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS (Glassmorphism & Gradients)
- **Network & APIs:** Axios, OMDB API, Google Gemini AI SDK
- **State Management:** React Context API + Local Storage
- **Asset Handling:** `FormData` API for multipart binary uploads

## Key Features

### Full-Stack Community Integration (Nexus Hub)

- **Real-Time CRUD Pipeline:** Seamlessly connects to a custom Node.js/Express backend to fetch, create, and delete community posts.
- **Multipart Asset Uploads:** Utilizes the native `FormData` object to securely package and dispatch user-uploaded image thumbnails alongside text data to the backend for Cloudinary streaming.
- **Optimistic UI Mutations:** Implements instant DOM updates upon data deletion, bypassing the need for heavy page reloads and ensuring a snappy user experience.
- **Inline Error Boundaries:** Deprecated legacy `alert()` dialogs in favor of custom Tailwind modals and inline error rendering for validation failures (e.g., 5MB file limits).

### Media Discovery & AI (Legacy CineStream)

- **Dynamic Search & Infinite Scroll:** Real-time OMDB API integration with a 500ms debounced input and a memory-efficient `IntersectionObserver` that hydrates the DOM automatically as users scroll.
- **Gemini Mood Matcher:** Integrated with Google's Generative AI. Users input contextual moods, and the LLM processes a strict prompt to return a precise movie title, triggering a silent search handoff.
- **Favorites Persistence:** Global state management via React Context, syncing seamlessly with `localStorage` across routes.
- **Performance Mastery:** Asset lazy loading (`loading="lazy"`, `decoding="async"`) and graceful SVG fallbacks for broken network images to maintain layout integrity.

## 👨‍💻 Author

**Shivam Kumar**
_Organization: Prodesk IT_
