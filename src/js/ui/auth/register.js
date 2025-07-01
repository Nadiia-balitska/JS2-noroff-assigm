document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const errorDisplay = document.getElementById("registerError");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const avatar = document.getElementById("avatar").value.trim();

    if (password !== confirmPassword) {
      errorDisplay.textContent = "❌ Passwords do not match.";
      return;
    }

    if (!email.endsWith("noroff.no")) {
      errorDisplay.textContent = "❌ Email must be a valid Noroff email address.";
      return;
    }

    try {
      console.log("📡 Sending registration request...");

      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, avatar }),
      });

      let parsed = {};
      try {
        parsed = await response.json();
        console.log("📨 Parsed response:", parsed);
      } catch {
        throw new Error("❌ Could not parse JSON from server.");
      }

      console.log("✅ Response OK?", response.ok);

      if (!response.ok) {
        const errorMessage =
          typeof parsed === "object" && parsed.errors?.[0]?.message
            ? parsed.errors[0].message
            : "Registration failed";

        throw new Error(errorMessage);
      }

      console.log("✅ Registered:", parsed);
      alert("✅ Registration successful! Redirecting to login...");
      window.location.href = "/login.html";

    } catch (err) {
      console.error("❌ Registration error:", err);
      errorDisplay.textContent = err.message;
    }
  });
});
