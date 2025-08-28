import { onRegister } from "../../ui/auth/register";
import { renderNavbar } from "../../ui/global/navbar.js";
renderNavbar(); // Even if logged out, it shows logo and login/register nav


const form = document.forms.register;

form.addEventListener("submit", onRegister);
