import { checkAuthGuard } from "../../utilities/authGuard.js";
import { fetchPosts } from "../../api/post/read.js";
import { deletePost } from "../../api/post/delete.js";
import { logoutUser } from "../../api/auth/logout.js";
import { showLoggedInUser } from "../../global/userDisplay.js";

checkAuthGuard();
showLoggedInUser();

document.getElementById("logoutBtn").addEventListener("click", logoutUser);

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("feedContainer");

  try {
    const posts = await fetchPosts();

    if (!posts.length) {
      container.innerHTML = "<p>No posts found.</p>";
      return;
    }

    container.innerHTML = posts
      .map(
        (post) => `
      <div class="post-card">
        <div class="post-user">
          <img src="${post.author.avatar}" alt="User Avatar" class="avatar" />
          <span class="username">${post.author.name}</span>
        </div>
        <p>${post.body || "No content."}</p>
        ${
          post.media
            ? `<img src="${post.media}" alt="Post Image" />`
            : ""
        }
        <button class="delete-btn" data-id="${post.id}">Delete</button>
      </div>
    `
      )
      .join("");

    // Add delete functionality
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const postId = btn.dataset.id;
        if (confirm("Delete this post?")) {
          try {
            await deletePost(postId);
            window.location.reload();
          } catch (err) {
            alert("Error deleting: " + err.message);
          }
        }
      });
    });
  } catch (error) {
    container.innerHTML = `<p>Error loading feed: ${error.message}</p>`;
  }
});
