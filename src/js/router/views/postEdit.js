export default async function postEdit() {
  const form = document.getElementById("edit-post-form");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!form || !postId) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`https://v2.api.noroff.dev/social/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await res.json();
    form.content.value = data.body;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const body = form.content.value;

      const updateRes = await fetch(`https://v2.api.noroff.dev/social/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      });

      if (updateRes.ok) {
        alert("Post updated!");
        window.location.href = "/feed/";
      } else {
        alert("Update failed");
      }
    });
  } catch (error) {
    console.error("Error loading post:", error);
  }
}
