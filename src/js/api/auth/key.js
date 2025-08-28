import { API_AUTH_KEY } from "../../ui/global/constants.js";
import { headers } from "../headers.js";

export async function getKey(name = "API Key") {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("Access token not found. Please log in.");

  const storedKey = localStorage.getItem("apiKey");
  if (storedKey) return storedKey;

  try {
    const response = await fetch(API_AUTH_KEY, {
      method: "POST",
      headers: headers(), // Includes Authorization and Content-Type
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.errors?.[0]?.message || "Failed to generate API key.");
    }

    const { data } = await response.json();
    localStorage.setItem("apiKey", data.key);
    return data.key;
  } catch (error) {
    console.error("API Key Error:", error);
    throw error;
  }
}
