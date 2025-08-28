
import { API_BASE_URL, API_KEY } from "../global/constants.js";

export async function getAllPosts(page = 1, tag = "") {
  const accessToken = localStorage.getItem("accessToken");

  let url = `${API_BASE_URL}/social/posts?_author=true&_comments=true&_reactions=true&limit=12&page=${page}`;
  if (tag) {
    url += `&_tag=${encodeURIComponent(tag)}`;
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || "Failed to fetch posts");
    }
    const { data, meta } = await response.json();
    return { data, meta };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
