export async function deletePost(id) {
    const token = localStorage.getItem("token");
  
    const response = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Could not delete post.");
    }
  
    return true;
  }