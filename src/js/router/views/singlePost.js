import { API_SOCIAL_POSTS, API_KEY } from "../../ui/global/constants.js";
import { deletePost } from "../../api/post/delete.js";
import { commentOnPost } from "../../api/post/comment.js";

const container = document.getElementById("postDetailsContainer");
const queryParams = new URLSearchParams(window.location.search);
const postId = queryParams.get("id");

if (!postId) {
  container.innerHTML = "<p>Error: No post ID provided in URL.</p>";
} else {
  loadSinglePost(postId);
}

async function loadSinglePost(id) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true&_comments=true&_reactions=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch post");

    const { data: post } = await response.json();

    container.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || ""}" width="400">` : ""}
      <p><strong>Author:</strong> ${post.author.name}</p>
      <p><strong>Tags:</strong> ${post.tags?.join(", ")}</p>
      <p><strong>Reactions:</strong> ${post._count?.reactions ?? 0}</p>
      <p><strong>Comments:</strong> ${post._count?.comments ?? 0}</p>

      <div id="commentSection">
        <h3>Leave a Comment</h3>
        <form id="commentForm">
          <textarea name="commentBody" id="commentBody" required placeholder="Write your comment..."></textarea><br>
          <button type="submit">Post Comment</button>
        </form>
        <div id="commentFeedback"></div>
      </div>
    `;

    // ✅ Display delete button if post belongs to current user
    if (post.author?.name === localStorage.getItem("username")) {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete Post";
      deleteBtn.addEventListener("click", async () => {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        try {
          await deletePost(post.id);
          alert("Post deleted successfully.");
          window.location.href = "/";
        } catch (err) {
          alert("Error deleting post: " + err.message);
        }
      });
      container.appendChild(deleteBtn);
    }

    // ✅ Render comments if present
    if (post.comments?.length) {
      const commentsSection = document.createElement("div");
      commentsSection.innerHTML = `<h3>Comments (${post.comments.length})</h3>`;

      post.comments.forEach((comment) => {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment");

        commentItem.innerHTML = `
          <p><strong>${comment.author?.name || "Unknown"}:</strong> ${comment.body}</p>
          <small>${new Date(comment.created).toLocaleString()}</small>
        `;

        commentsSection.appendChild(commentItem);
      });

      container.appendChild(commentsSection);
    }

    // ✅ Handle comment submission
    document.getElementById("commentForm")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const commentBody = document.getElementById("commentBody").value;
      const feedback = document.getElementById("commentFeedback");

      try {
        await commentOnPost(postId, commentBody);
        feedback.textContent = "Comment posted!";
        document.getElementById("commentForm").reset();
        loadSinglePost(postId); // Refresh view
      } catch (err) {
        feedback.textContent = "Error: " + err.message;
      }
    });

  } catch (error) {
    container.innerHTML = `<p>Error loading post: ${error.message}</p>`;
  }
}
