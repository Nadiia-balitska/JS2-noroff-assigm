import { getPosts } from "../../../js/api/post/read.js";

export default async function feed() {
  const container = document.querySelector(".post-list");
  if (!container) return;

  try {
    const posts = await getPosts();

    container.innerHTML = posts
      .map((post) => {
        return `
          <article class="bg-white p-4 mb-4 rounded shadow">
            <div class="flex items-center gap-2 mb-2">
              <img src="https://placehold.co/40x40" alt="Avatar" class="rounded-full w-10 h-10" />
              <strong>${post.author?.name || "Anonymous"}</strong>
            </div>
            <p class="text-gray-800 mb-2">${post.body}</p>
            ${
              post.media
                ? `<img src="${post.media}" alt="Post Image" class="w-full rounded" />`
                : ""
            }
            <p class="text-sm text-gray-500 mt-2">${new Date(
              post.created
            ).toLocaleString()}</p>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    container.innerHTML = `<p class="text-red-500">Error loading posts.</p>`;
    console.error("Feed Error:", error);
  }
}
