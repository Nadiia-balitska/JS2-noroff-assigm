import { authGuard } from "../../utilities/authGuard.js";
import { setLogoutListener } from "../../ui/global/logout.js";
import { onReadAllPosts } from "../../api/post/read.js";
import { renderNavbar } from "../../ui/global/navbar.js";

renderNavbar();


authGuard(); // Ensure the user is logged in before accessing home
setLogoutListener(); // Attach logout functionality

// Load all posts initially
onReadAllPosts();
const profile = JSON.parse(localStorage.getItem('profile'));
const welcome = document.createElement("h2");
welcome.textContent = `Welcome, ${profile?.name || "User"}!`;
welcome.classList.add("text-xl", "mb-4", "text-blue-600");

document.querySelector("main")?.prepend(welcome);


// Search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  onReadAllPosts(query); // Reload posts with search term
});
