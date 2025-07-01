export default async function profile() {
  const container = document.getElementById("profile-data");
  if (!container) return;

  try {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const response = await fetch(`https://v2.api.noroff.dev/social/profiles/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await response.json();

    container.innerHTML = `
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl font-semibold">${data.name}</h2>
        <p>Email: ${data.email}</p>
        <p>Bio: ${data.bio || "N/A"}</p>
        <p>Followers: ${data._count.followers}</p>
        <p>Following: ${data._count.following}</p>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<p class="text-red-600">Failed to load profile data.</p>`;
    console.error(error);
  }
}
