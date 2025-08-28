
// src/api/posts/update.js
import { API_BASE_URL, API_KEY } from "../constants.js";


export async function updatePost(id, postData) {
  const accessToken = localStorage.getItem('accessToken');
  const url = `${API_BASE_URL}/social/posts/${id}`;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Update failed');
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// src/api/posts/delete.js
export async function deletePost(id) {
  const accessToken = localStorage.getItem('accessToken');
  const url = `${API_BASE_URL}/social/posts/${id}`;

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Delete failed');
    }
    return true;
  } catch (error) {
    throw error;
  }
}
