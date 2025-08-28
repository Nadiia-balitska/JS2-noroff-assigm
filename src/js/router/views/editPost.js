import { API_SOCIAL_POSTS, API_KEY } from "../../ui/global/constants.js";

const accessToken = localStorage.getItem("accessToken");
const postId = new URLSearchParams(window.location.search).get("id");

const form = document.getElementById("editPostForm");
const formMessage = document.getElementById("formMessage");

if (!accessToken || !postId) {
  window.location.href = "/auth/login/";
}

// Fetch and prefill the form with existing post data
async function fetchPostData() {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load post.");
    }

    const { data } = await response.json();

    form.title.value = data.title || "";
    form.body.value = data.body || "";
    form.tags.value = data.tags ? data.tags.join(", ") : "";
    form.mediaUrl.value = data.media?.url || "";
  } catch (error) {
    formMessage.textContent = `Error: ${error.message}`;
  }
}

// Submit the updated post data
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updatedPost = {
    title: form.title.value.trim(),
    body: form.body.value.trim(),
    tags: form.tags.value.split(",").map(tag => tag.trim()).filter(Boolean),
    media: {
      url: form.mediaUrl.value.trim(),
      alt: "User-provided image",
    },
  };

  if (!updatedPost.media.url) delete updatedPost.media;

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error("Failed to update the post.");
    }

    formMessage.style.color = "green";
    formMessage.textContent = "Post updated successfully!";
  } catch (error) {
    formMessage.style.color = "red";
    formMessage.textContent = `Error: ${error.message}`;
  }
});

fetchPostData();
