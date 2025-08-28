import { API_BASE_URL, API_KEY } from "../../ui/global/constants.js";

// Fetch all posts (optionally with tag, pagination)
export async function getAllPosts({ limit = 12, page = 1, tag = '', withAuthor = true } = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const params = new URLSearchParams({
    limit,
    page,
    _author: withAuthor,
    _comments: true,
    _reactions: true,
  });

  if (tag) {
    params.append("tag", tag);
  }

  const url = `${API_BASE_URL}/social/posts?${params.toString()}`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || "Failed to load posts");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Fetch a single post by ID
export async function getPostById(postId) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}/social/posts/${postId}?_author=true&_comments=true&_reactions=true`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || "Failed to fetch post");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
}

// Fetch posts by a specific user
export async function getPostsByUser(username, { limit = 12, page = 1 } = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const params = new URLSearchParams({
    limit,
    page,
    _author: true,
  });

  const url = `${API_BASE_URL}/social/profiles/${username}/posts?${params.toString()}`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || "Failed to fetch user's posts");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    throw error;
  }
}
