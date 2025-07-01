const BASE_URL = "https://v2.api.noroff.dev";
const LOGIN_ENDPOINT = "/auth/login";

/**
 * Login a user with email and password using Noroff API
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{accessToken: string, name: string, email: string}>}
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.errors?.[0]?.message || "Invalid email or password.";
    throw new Error(errorMsg);
  }

  return data.data;
}
