export async function getPosts() {
  const token = localStorage.getItem("token");

  const response = await fetch("https://v2.api.noroff.dev/social/posts?_author=true", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Could not fetch posts.");
  }

  const result = await response.json();
  return result.data;
}
