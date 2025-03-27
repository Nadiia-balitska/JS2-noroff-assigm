/**
 * Displays a post's details on the page, including title, content, author, and comments.
 * Handles interactions such as adding comments, and conditionally shows delete and edit buttons
 * if the logged-in user is the author of the post.
 * 
 * @async
 * @file viewPost.js
 */

import { readPost } from "../../api/post/read.js";
import { readProfile } from "../../api/profile/read.js";
import { commentOnPost } from "../../api/post/update.js";

(async function () {
  try {
    const profile = await readProfile();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      console.error("Post ID not found in URL");
      return;
    }

    const postResponse = await readPost(id);
    const post = postResponse.data;

    // Populate post details
    document.getElementById("authorBurner").src = post.author.banner?.url || "";
    document.getElementById("username").textContent = post.author.name;
    document.getElementById("title").textContent = post.title;
    document.getElementById("content").textContent = post.body;
    document.getElementById("postimage").src = post.media?.url || "";

    // Render existing comments
    renderComments(post.comments);

    // Handle adding new comments
    document.getElementById("add-comment").addEventListener("click", async (e) => {
      e.preventDefault();
      await addComment(id);
    });

  } catch (error) {
    console.error("Error loading post:", error);
  }
})();

/**
 * Renders the list of comments on the page.
 * @param {Array} comments - List of comments to render
 */
function renderComments(comments) {
  const commentList = document.getElementById("commentList");
  commentList.innerHTML = ""; // Clear previous comments

  if (comments && comments.length > 0) {
    comments.forEach(comment => {
      const date = new Date(comment.created).toLocaleDateString();
      const commentHtml = `
        <div class="flex items-start space-x-4">
          <img src="${comment.author.banner.url}" alt="${comment.author.name}" class="w-8 h-8 rounded-full object-cover">
          <div>
            <span class="font-bold">${comment.author.name}</span>
            <p>${comment.body}</p>
            <span class="text-xs text-gray-500">${date}</span>
          </div>
        </div>`;
      commentList.insertAdjacentHTML("beforeend", commentHtml);
    });
  } else {
    commentList.innerHTML = "<p class='text-gray-500'>No comments yet.</p>";
  }
}

/**
 * Adds a new comment to the post
 * @param {string} postId - The ID of the post to comment on
 */
async function addComment(postId) {
  const commentBody = document.getElementById("comment-body").value.trim();

  if (!commentBody) {
    alert("Comment cannot be empty!");
    return;
  }

  try {
    await commentOnPost(postId, { body: commentBody });
    location.reload(); // Reload to display the new comment
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}
