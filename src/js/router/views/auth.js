import { API_AUTH_LOGIN, API_AUTH_REGISTER } from "./src/js/api/constants.js";
import { headers } from "./src/js/api/headers.js";

export async function loginUser({ email, password }) {
  const res = await fetch(API_AUTH_LOGIN, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(API_AUTH_REGISTER, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name: username, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}

