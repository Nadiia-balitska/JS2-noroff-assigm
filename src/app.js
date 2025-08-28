import "./css/style.css";
import router from "./js/router/index.js";
import { renderNavbar } from "./js/ui/global/navbar.js";
import { getAllPosts } from "./js/api/post/read.js";

// Shared navbar across pages
renderNavbar();


document.addEventListener("DOMContentLoaded", async () => {
  await router(window.location.pathname);

  const authButton = document.getElementById("auth-button");
  const token = localStorage.getItem("accessToken");

  // Setup login/logout button
  if (authButton) {
    authButton.textContent = token ? "Logout" : "Login";
    authButton.addEventListener("click", () => {
      if (token) {
        localStorage.clear();
        window.location.href = "/auth/login/";
      } else {
        window.location.href = "/auth/login/";
      }
    });
  }

  
  if (token && document.getElementById("homePostsContainer")) {
    await initializeApp();
  }
});


async function initializeApp() {
  try {
    const posts = await getAllPosts();
    console.log("Loaded posts:", posts);
    // You can render posts to DOM here if you like
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}
