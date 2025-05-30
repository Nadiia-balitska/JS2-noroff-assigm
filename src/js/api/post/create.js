export async function createPost({ title, body = "", media = "" }) {
  const token = localStorage.getItem("token");

  const response = await fetch("https://v2.api.noroff.dev/social/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body, media }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to create post");
  }

  return await response.json();
}
