1. What does <React.StrictMode> actually do in main.jsx?
2. Why do we have to wrap our whole app in <BrowserRouter>?
3. In React, why can't a component return two <div> elements side-by-side? Why do they need one big parent wrapper?
4. What is the difference between <a href="/favorites"> and React Router's <Link to="/favorites">?
5. How does useLocation() help us change the color of the navigation link when we are on that specific page?
6. Why do we map over the movies array using {movies.map((movie) => ...)} instead of using a standard for loop?
7. What happens if we don't give our mapped MovieCard a unique key prop?
8. Why did we use useRef(null) for the invisible loader div at the bottom instead of useState?
9. I noticed useEffect has an empty array [] at the end sometimes, and sometimes it has things like [searchQuery, page]. What does that array do?
10. How does the app know to reset to page 1 when I type a brand new movie in the search bar?
11. Why do we put setLoading(true) at the start of our fetch function and setLoading(false) inside a finally block?
12. What exactly is a "cleanup function" in useEffect, and why did we need it for our IntersectionObserver?
13. What does "Debouncing" mean, and why is it mandatory for enterprise apps?
14. In the SearchBar, how does setTimeout stop the app from calling the API every time I press a single letter?
15. What happens if a user types super fast? Does clearTimeout cancel the old API requests?
16. How does the IntersectionObserver actually work? How does it know when I've scrolled to the bottom?
17. Why did we have to create a hasMore state? How does it stop the infinite fetching loop?
18. For the images, what does adding loading="lazy" actually do under the hood?
19. Why did we add decoding="async" to the images along with lazy loading?
20. What does import.meta.env.VITE*TMDB_KEY mean? Why does it start with VITE*?
21. Why did we have to map the OMDB data (like movie.Title) to look like TMDB data (like movie.title) inside tmdb.js?
22. What does axios do that the normal JavaScript fetch() doesn't do?
23. When we catch an error in our try...catch block, why do we use setError(err.message) instead of just console.log?
24. What is the React Context API, and why did we use it for the Favorites instead of just passing props down?
25. Why do we put children inside the <FavoritesContext.Provider>?
26. Why did we wrap JSON.parse(saved) in a try...catch block inside the Favorites Context? Can localStorage actually crash an app?
27. In the addFavorite function, how does prev.some(...) prevent a user from adding the exact same movie to their favorites twice?
28. How do you integrate an AI like Gemini into a React app? Do you just install an npm package?
29. How did we force the AI to only return a movie title and not say things like, "Here is a movie you might like..."?
30. What is a "silent handoff"? How did the AI's answer automatically trigger a search without the user pressing enter again?
31. Why did we use regex .replace(/["'\n]/g, "") on the AI's response before sending it to OMDB?
32. Why did we disable the "Ask AI" button while isAnalyzing was true?
33. How did overflow-x-hidden on the body fix the horizontal scrolling bug?
34. What does backdrop-blur-md do, and why does it make the UI look like frosted glass?
35. How do we make the layout responsive so it looks good on a phone? What do prefixes like sm: and md: do?
36. If a movie doesn't have a poster image, how did we make it show a grey box with an SVG icon instead of looking broken?
37. How did we make the background look so cool with bg-[radial-gradient(...)]?
38. What is line-clamp-2, and how does it stop super long movie titles from breaking the card layout?
39. Explain this error "...".
40. What is the good way to show the modernise ui for media explorer websites?
41. Give me an overview if MERN Stack is used in netflix or any similar webs, then how it should be optimized.
