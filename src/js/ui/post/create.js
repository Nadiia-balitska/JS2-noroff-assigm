import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const body = form.content.value;
  const file = form.upload.files[0];
  const media = file ? URL.createObjectURL(file) : "";

  try {
    await createPost({
      title: "New Post",
      body,
      media,
    });
    alert("Post created!");
    window.location.href = "/pages/feed/index.html";
  } catch (error) {
    alert("Error creating post: " + error.message);
  }
}
