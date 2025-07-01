// Import global styles
import "./css/style.css";

// Import the router function (named import)
import { router } from "./js/router/index.js";

// Initialize router on first load
router(window.location.pathname);

// Re-run router on browser navigation
window.addEventListener("popstate", () => {
  router(window.location.pathname);
});
