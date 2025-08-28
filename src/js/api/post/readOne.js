import { API_BASE_URL, API_KEY } from '../../ui/global/constants.js';

export async function getSinglePost(id) {
  const accessToken = localStorage.getItem('accessToken');
  const url = `${API_BASE_URL}/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Failed to fetch post');
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
