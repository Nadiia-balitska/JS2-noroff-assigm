import { loginUser } from "../../api/auth/login.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms["login"];
  const errorMessages = document.getElementById("errorMessages");
  const successMessages = document.getElementById("successMessages");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Reset messages
    errorMessages.textContent = "";
    successMessages.textContent = "";

    if (!email || !password) {
      errorMessages.textContent = "Please fill out both fields.";
      return;
    }

    try {
      await loginUser(email, password);
      successMessages.textContent = "Login successful! Redirecting...";

      // Optional: show user feedback for a moment
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      errorMessages.textContent = error.message || "Login failed.";
      console.error("Login error:", error);
    }
  });
});
