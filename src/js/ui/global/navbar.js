import { onLogout } from "../auth/logout.js";

export function renderNavbar() {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const username = JSON.parse(localStorage.getItem("profile"))?.name || "Guest";
  
    const navbar = document.createElement("nav");
    navbar.className = "flex justify-between items-center bg-white px-6 py-4 shadow-md";
  
    navbar.innerHTML = `
      <a href="/" class="flex items-center space-x-3">
        <img src="/public/images/noroff-logo.png" alt="Noroff Logo" class="h-10 w-auto" />
      </a>
      <div class="flex items-center space-x-6">
        <a href="/" class="text-gray-700 hover:text-blue-600 transition">Home</a>
        ${isLoggedIn ? `<a href="/profile/" class="text-gray-700 hover:text-blue-600 transition">My Profile</a>` : ""}
        ${isLoggedIn ? `<a href="/post/create/" class="text-gray-700 hover:text-blue-600 transition">Create Post</a>` : ""}
        <button id="auth-button" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          ${isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    `;
  
    document.body.prepend(navbar);
  
    const authButton = document.getElementById("auth-button");
  
    authButton?.addEventListener("click", () => {
        if (isLoggedIn) {
          onLogout(); 
        } else {
          window.location.href = "/auth/login/";
        }
      });
  }
  