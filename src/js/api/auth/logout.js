export function logoutUser() {
  localStorage.clear();
  window.location.href = "/auth/login/index.html";
}