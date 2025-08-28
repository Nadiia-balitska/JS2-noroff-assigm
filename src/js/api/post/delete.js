// src/api/posts/delete.js
import { API_BASE_URL, API_KEY } from "../../ui/global/constants.js";

export async function deletePost(id) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}/social/posts/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    throw error;
  }
}
