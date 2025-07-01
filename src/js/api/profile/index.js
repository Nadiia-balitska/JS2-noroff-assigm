document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const avatar = user?.avatar || "https://placekitten.com/200/200";

  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  document.getElementById("profile-name").textContent = user.name;
  document.getElementById("profile-email").textContent = user.email;
  document.getElementById("profile-avatar").src = avatar;

  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login.html";
  });
});
