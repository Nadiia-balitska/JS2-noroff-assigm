import { onLogin } from "../../ui/auth/login";
import { renderNavbar } from "../../ui/global/navbar.js";
renderNavbar();


const form = document.forms.login;

form.addEventListener("submit", onLogin);
