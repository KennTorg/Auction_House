import { createListing } from "../api/listings/create.mjs";

/**
 * Create Listing Handler
 */
export function setCreateListingListener() {
  const form = document.querySelector("#create-listing");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const title = formData.get("title");
      const description = formData.get("body");
      const tags = formData.get("tags").split(", ");
      const media = formData.get("media").split(", ");
      const endsAt = formData.get("endsAt");

      // Adds form validation
      if (!title || !description || !endsAt) {
        alert("Please fill in all required fields");
        return;
      }

      const listing = { title, description, tags, media, endsAt };

      // Clearing the form
      form.reset();

      // Deletes the media if there is an empty string
      if (listing.media === "") {
        delete listing.media;
      }

      try {
        // Sends it to the API
        await createListing(listing);
        // Replace with more specific action as needed
        location.reload();
      } catch (error) {
        alert(`Failed to create listing: ${error.message}`);
      }
    });
  }
}
