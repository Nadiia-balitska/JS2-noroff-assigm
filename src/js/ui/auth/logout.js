export function setLogoutListener(buttonId = "logout-btn") {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/auth/login/index.html";
      });
    }
  }
  