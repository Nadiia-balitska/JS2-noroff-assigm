import { remove } from "../../api/auth/key.js";
import { renderNavbar } from "../../ui/global/navbar.js"; 

export function onLogout() {
  try {
    remove("accessToken");
    remove("profile");
    alert("You are signed out. See you next time!");
    window.location.href = "/auth/login/";
  } catch (error) {
    console.error("Failed to sign out:", error);
  }
}
