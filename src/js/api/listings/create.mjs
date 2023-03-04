import { API_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/listings";
const method = "post";

/**
 * Creates a new post.
 * @param {string} listData - input information.
 */

export async function createListing(listData) {
  const createListingURL = `${API_URL}${action}`;

  try {
    const response = await authFetch(createListingURL, {
      method,
      body: JSON.stringify(listData),
    });

    if (response.ok) {
      // Replace with more specific action as needed
      location.reload();
      return await response.json();
    } else {
      throw new Error(`Failed to create listing: ${response.statusText}`);
    }
  } catch (error) {
    alert(error.message);
  }
}
