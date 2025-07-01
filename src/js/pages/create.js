document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createPostForm");
    const message = document.getElementById("postMessage");
  
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      window.location.href = "/login.html";
      return;
    }
  
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const title = document.getElementById("title").value.trim();
      const body = document.getElementById("body").value.trim();
      const media = document.getElementById("media").value.trim();
  
      if (!title) {
        message.textContent = "Title is required.";
        return;
      }
  
      try {
        const response = await fetch("https://v2.api.noroff.dev/social/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, body, media }),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result?.errors?.[0]?.message || "Post failed");
        }
  
        alert("✅ Post created successfully!");
        window.location.href = "/feed.html";
      } catch (err) {
        console.error("❌ Post error:", err);
        message.textContent = err.message;
      }
    });
  });
  