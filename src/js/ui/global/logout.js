import { onLogout } from "../auth/logout";
import { renderNavbar } from "../../ui/global/navbar.js"; 


export function setLogoutListener() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", onLogout);
  }
}