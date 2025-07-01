import { loginUser } from "./auth.js"; // Correct path 

/**
 * Handles user login
 * @param {Event} event - The form submit event
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;
  const messageBox = document.getElementById("message");

  if (!email || !password) {
    if (messageBox) {
      messageBox.innerHTML = `<p style="color: red;">Please enter both email and password.</p>`;
    }
    return;
  }

  try {
    const result = await loginUser({ email, password });

    // Save login info to localStorage
    localStorage.setItem("authToken", result.accessToken);
    localStorage.setItem("username", result.name);

    if (messageBox) {
      messageBox.innerHTML = `<p style="color: green;">Login successful! Redirecting...</p>`;
    }

    setTimeout(() => {
      window.location.href = "/feed/"; //Go to feed after login
    }, 1500);
  } catch (error) {
    if (messageBox) {
      messageBox.innerHTML = `<p style="color: red;">${error.message}</p>`;
    } else {
      alert("Login error: " + error.message);
    }
  }
}
