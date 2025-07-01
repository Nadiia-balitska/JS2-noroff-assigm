import { updatePost } from "../../../api/post/update.js";
import { readPost } from "../../../api/post/read.js";

// Load the post content into the textarea for editing
export async function loadPost(id) {
  try {
    const post = await readPost(id);
    const contentField = document.getElementById("content");
    if (post?.body) {
      contentField.value = post.body;
    }
  } catch (error) {
    alert("Failed to load post: " + error.message);
  }
}

// Handle form submission to update the post
export async function onEditPost(event, id) {
  event.preventDefault();

  const contentField = document.getElementById("content");
  const body = contentField.value.trim();

  if (!body) {
    alert("Post content is required.");
    return;
  }

  try {
    await updatePost(id, { title: "Updated Post", body });
    alert("Post updated successfully!");
    window.location.href = "/feed/";
  } catch (error) {
    alert("Failed to update post: " + error.message);
  }
}
