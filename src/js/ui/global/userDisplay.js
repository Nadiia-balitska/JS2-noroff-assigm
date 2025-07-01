export function showLoggedInUser() {
    const userInfo = document.getElementById("userInfo");
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.name) {
      userInfo.innerHTML = `
        <img src="${user.avatar}" alt="Avatar" class="nav-avatar" />
        <span class="nav-username">${user.name}</span>
      `;
    }
  }
  