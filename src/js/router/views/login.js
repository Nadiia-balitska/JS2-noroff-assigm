import { loginUser } from "../../api/auth.js";

export function setupLoginForm() {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const { accessToken } = await loginUser({ email, password });
        localStorage.setItem("token", accessToken);
        window.location.href = "/feed/";
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    });
  }
}

// Optional: run it immediately
setupLoginForm();
