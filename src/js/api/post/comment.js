import { API_BASE_URL, API_KEY } from "../../ui/global/constants.js";

export async function commentOnPost(postId, commentBody) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}/social/posts/${postId}/comment`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({ body: commentBody }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || "Failed to post comment");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}