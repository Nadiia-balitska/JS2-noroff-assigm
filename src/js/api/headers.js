import { API_KEY } from "../src/js/api/constants.js";

export function headers(auth = false) {
  const h = new Headers();
  h.append("Content-Type", "application/json");
  h.append("X-Noroff-API-Key", API_KEY);
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) h.append("Authorization", `Bearer ${token}`);
  }
  return h;
}
