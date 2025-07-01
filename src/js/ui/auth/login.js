
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorDisplay = document.getElementById("loginError");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    console.log("🔐 Logging in with:", email, password);

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Invalid email or password");
      }

      // Save user + token
      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      console.log("✅ Login successful:", data);
      window.location.href = "/feed.html";
    } catch (err) {
      console.error("❌ Login error:", err.message);
      errorDisplay.textContent = err.message;
    }
  });
});

