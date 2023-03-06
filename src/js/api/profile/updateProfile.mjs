import { API_URL } from "../constants.mjs";
import { load } from "../../storage/index.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

/**
 * Updates user profile info
 * @param {object} mediaData - media data to update user's avatar
 * @returns {Promise<object>} - updated profile data
 */

export async function changeAvatar(mediaData) {
  const { name } = load("profile");

  if (!name) {
    throw new Error("Username not available");
  }

  const updateProfileURL = `${API_URL}${action}/${name}/media`;

  try {
    const response = await authFetch(updateProfileURL, {
      method,
      body: JSON.stringify(mediaData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }
  } catch (error) {
    // Handle network errors or server errors
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}
