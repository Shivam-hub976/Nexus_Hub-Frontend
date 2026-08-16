# 🎬 CineStream

![CineStream Banner](https://via.placeholder.com/1200x400/111827/3b82f6?text=CineStream+-+Premium+Media+Discovery)

**Live Demo:** [https://cine-stream-mocha-eight.vercel.app/](#)

## Overview

CineStream is a high-fidelity, enterprise-level media discovery Single Page Application (SPA). Engineered to mimic a premium streaming platform experience, it allows users to browse popular films, search specific titles, save personal favorites, and discover new movies using an AI-powered contextual "Mood Matcher."

## Key Features

### Core Experience

- **Premium Cinematic UI:** Modern glassmorphism (`backdrop-blur`), deep radial gradients, and responsive CSS Grid layouts for a flawless mobile and desktop experience.
- **Dynamic Search:** Real-time OMDB API integration with a 500ms debounced input to optimize network requests and reduce server compute costs.
- **Favorites Persistence:** Global state management via React Context, syncing seamlessly with `localStorage` across the Discover and Favorites routes.

### Performance Mastery

- **Infinite Scroll Architecture:** Deprecated standard pagination in favor of a memory-efficient `IntersectionObserver` that automatically hydrates the DOM with new payload pages as the user scrolls.
- **Asset Lazy Loading:** Native `loading="lazy"` and `decoding="async"` applied to all heavy poster assets to eliminate render-blocking and layout thrashing.
- **Graceful Fallbacks:** Intercepts missing API assets and broken network image links with custom SVG placeholders to prevent grid collapse.

### AI Architecture

- **Gemini Mood Matcher:** Integrated with the `@google/generative-ai` SDK (utilizing the blazing fast `gemini-2.5-flash` model). Users can input contextual moods (e.g., _"I want a funny sci-fi movie"_), and the LLM processes a strict prompt to return a precise title.
- **Silent Handoff:** The AI recommendation is seamlessly injected into the application's search state, automatically triggering the OMDB fetch without manual user intervention.

## Tech Stack

- **Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Network & APIs:** Axios, OMDB API, Google Gemini SDK
- **State Management:** React Context API + Local Storage

_CineStream-MediaExplorer_
