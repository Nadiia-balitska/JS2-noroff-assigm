import { API_SOCIAL_POSTS, API_KEY } from "../../../ui/global/constants.js";
import { authGuard } from "../../../utilities/authGuard.js";
import { renderNavbar } from "../../ui/global/navbar.js";


authGuard();
renderNavbar();

const form = document.getElementById("createPostForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.textContent = "";

  const accessToken = localStorage.getItem("accessToken");

  const formData = new FormData(form);
  const title = formData.get("title").trim();
  const body = formData.get("body").trim();
  const tags = formData.get("tags").split(",").map(tag => tag.trim()).filter(Boolean);
  const mediaUrl = formData.get("mediaUrl").trim();

  const postData = {
    title,
    ...(body && { body }),
    ...(tags.length > 0 && { tags }),
    ...(mediaUrl && { media: { url: mediaUrl } }),
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message || "Failed to create post");
    }

    const result = await response.json();
    message.textContent = "Post created successfully!";
    setTimeout(() => {
      window.location.href = `/post/?id=${result.data.id}`;
    }, 1000);

  } catch (err) {
    message.textContent = `Error: ${err.message}`;
  }
});
