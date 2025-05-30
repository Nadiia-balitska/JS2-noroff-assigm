const token = localStorage.getItem("token");

if (!token) {
  alert("You must be logged in to view this page.");
  window.location.href = "/auth/login/index.html";
}

async function getPosts() {
  const response = await fetch("https://v2.api.noroff.dev/social/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch posts");
  }

  const { data } = await response.json();
  return data;
}

function renderPost(post) {
  const postElement = document.createElement("div");
  postElement.className = "p-4 border rounded shadow mb-4 bg-white";

  postElement.innerHTML = `
    <h2 class="font-bold">${post.title}</h2>
    <p>${post.body}</p>
    ${post.media ? `<img src="${post.media}" alt="Post image" class="mt-2 rounded">` : ""}
  `;

  return postElement;
}

(async () => {
  try {
    const posts = await getPosts();
    const feedContainer = document.getElementById("feed");

    if (feedContainer) {
      posts.forEach((post) => {
        feedContainer.appendChild(renderPost(post));
      });
    }
  } catch (err) {
    console.error("Error loading feed:", err.message);
  }
})();
