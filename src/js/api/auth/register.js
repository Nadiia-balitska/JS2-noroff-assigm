/**
 * Handles registration form submission
 * @param {Event} event 
 */
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const username = form.username.value.trim();
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value;
  const confirm = form["confirm-password"].value;
  const messageBox = document.getElementById("message");

  // Validate matching passwords
  if (password !== confirm) {
    return (messageBox.innerHTML = `<p style="color: red;">Passwords do not match.</p>`);
  }

  // Validate username (only letters, numbers, underscores)
  const validUsername = /^[\w]+$/.test(username);
  if (!validUsername) {
    return (messageBox.innerHTML = `<p style="color: red;">Username can only contain letters, numbers, and underscores.</p>`);
  }

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Registration failed.");
    }

    messageBox.innerHTML = `<p style="color: green;">Account created! Redirecting to login...</p>`;
    setTimeout(() => {
      window.location.href = "/auth/login/index.html";
    }, 2000);

  } catch (error) {
    messageBox.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
