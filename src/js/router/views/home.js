import { authGuard } from "../../utilities/authGuard";
import { readPosts } from "../../api/post/read.js";
import { deletePost } from "../../api/post/delete.js"; // Import the deletePost function
import { setLogoutListener } from "../../ui/global/logout.js";
import { readProfile } from "../../api/profile/read.js";


setLogoutListener();
authGuard();



const profile = await readProfile();

async function populatePosts() {
  const mainContent = document.querySelector(".main-content");

  if (!mainContent) {
    console.error("Main content element not found");
    return;
  }

  mainContent.innerHTML = "Populating posts...";

  try {
    const response = await readPosts(12, 1);
    let posts = response.data;
    posts = posts.slice(0, 12);

    if (!Array.isArray(posts)) {
      console.error("Error: Expected an array of posts, but got:", posts);
      mainContent.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
      return;
    }

    if (posts.length === 0) {
      mainContent.innerHTML = "<p>No posts available at the moment.</p>";
      return;
    }

    // Clear the placeholder text
    mainContent.innerHTML = '';

    // Generate each post card
    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.classList.add("bg-white", "rounded-lg", "shadow-lg", "p-6", "mb-10", "max-w-xl", "mx-auto", "border", "border-gray-200", "cursor-pointer");

      postCard.innerHTML = `
        <a href="/post/?id=${post.id}" class="no-underline text-inherit">
          <div class="flex items-center mb-4">
            <img src="${post.author?.avatar?.url || "../../../public/images/shirwacProfile.avif"}" alt="${post.author?.name || "Unknown User"}" class="w-12 h-12 rounded-full mr-3">
            <div class="font-semibold text-lg text-gray-800">${post.author?.name || "Unknown User"}</div>
          </div>
        </a>
        <h2 class="text-xl font-semibold mb-2">${post.title || "Untitled Post"}</h2>
        <div class="text-sm text-gray-600 mb-4">${post.body || "No content available."}</div>

        <div class="mb-4">
          <img src="${post.media?.url || "../../../public/images/weather.avif"}" alt="Post Image" class="w-full rounded-lg">
        </div>

        <div class="flex items-center space-x-3 mb-4">
          <button class="bg-blue-500 text-white px-4 py-2 rounded text-sm transition hover:bg-blue-700">👍 Like</button>
          ${
            post.author?.name === profile.data.name
              ? `
                <button class="bg-blue-500 text-white px-4 py-2 rounded text-sm transition hover:bg-blue-700 edit-button" data-id="${post.id}">Edit</button>
                <button class="bg-red-500 text-white px-4 py-2 rounded text-sm transition hover:bg-red-600 delete-btn">Delete</button>`
              : ""
          }
        </div>

        <div class="mt-4">
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm" placeholder="Add a comment...">
          <button class="bg-green-500 text-white px-4 py-2 rounded text-sm transition hover:bg-green-600">Comment</button>
          <div class="mt-4 pl-4 border-l-2 border-gray-300">
            <div class="text-sm text-gray-700 mt-2">Sample comment text</div>
          </div>
        </div>
      `;

      postCard.addEventListener("click", (e) => {
        // Ensure the click was not on a button within the post card
        if (!e.target.closest("button")) {
          // Open the new page or post details page
          window.location.href = `/post/?id=${post.id}`;
        }
      });

      // Attach delete event listener to dynamically created Delete button
      const deleteButton = postCard.querySelector(".delete-btn");
      if (deleteButton) {
        deleteButton.addEventListener("click", async () => {
          const confirmDelete = confirm("Are you sure you want to delete this post?");
          if (confirmDelete) {
            try {
              await deletePost(post.id);
              postCard.remove();
              alert("Post deleted successfully.");
            } catch (error) {
              console.error("Error deleting post:", error);
              alert("Failed to delete post.");
            }
          }
        });
      }

      // Attach edit event listener to dynamically created Edit button
      const editButton = postCard.querySelector(".edit-button");
      if (editButton) {
        editButton.addEventListener("click", () => {
          const postId = editButton.getAttribute("data-id");
          // Redirect to edit page with the post ID
          window.location.href = `/post/edit/?id=${postId}`;
        });
      }

      mainContent.appendChild(postCard); // Append each post card to mainContent
    });
  } catch (error) {
    console.error("Error populating posts:", error);
    mainContent.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
  }
}

window.addEventListener("load", () => {
  populatePosts();
});

populatePosts()