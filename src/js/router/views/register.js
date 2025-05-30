import { registerUser } from "../../api/auth.js";

export function setupRegisterForm() {
  const registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await registerUser({ username, email, password });
        alert("Registration successful. Please log in.");
        window.location.href = "/auth/login/";
      } catch (error) {
        alert("Registration failed: " + error.message);
      }
    });
  }
}

// Optional: run it immediately
setupRegisterForm();
