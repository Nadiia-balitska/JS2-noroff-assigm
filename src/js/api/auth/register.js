import { API_BASE_URL, API_KEY } from '../../ui/global/constants.js';

export async function registerUser(user) {
  const url = `${API_BASE_URL}/auth/register`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Registration failed');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
