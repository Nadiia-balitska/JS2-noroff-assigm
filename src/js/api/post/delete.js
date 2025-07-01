export async function deletePost(id) {}
import { API_SOCIAL_POSTS } from "../src/js/api/constants.js";
import { headers } from "../src/js/api/headers.js";

/**
 * Delete a post by ID.
 */
export async function deletePost(id) {
  const res = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: "DELETE",
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Delete failed");
}
