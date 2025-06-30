export function authGuard(redirectTo = "/auth/login/") {
  const token = localStorage.getItem("authToken"); 
  if (!token) {
    alert("You must be logged in to view this page.");
    window.location.href = redirectTo;
  }
}
