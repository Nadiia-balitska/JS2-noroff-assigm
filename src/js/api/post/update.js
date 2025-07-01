export async function updatePost(id, { title, body, tags, media }) {}
import { API_SOCIAL_POSTS } from "../src/js/api/constants.js";
import { headers } from "../src/js/api/headers.js";

/**
 * Update a post by ID.
 */
export async function updatePost(id, data) {
  const res = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: "PUT",
    headers: headers(true),
    body: JSON.stringify(data),
  });
  return await res.json();
}
