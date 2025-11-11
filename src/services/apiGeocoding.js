/**
 * Reverse geocode coordinates to get a human-readable address
 * @param {Object} position - Object with latitude and longitude
 * @param {number} position.latitude - Latitude coordinate
 * @param {number} position.longitude - Longitude coordinate
 * @returns {Promise<string>} Formatted address string
 * @throws {Error} If geocoding fails
 */
export async function getAddress({ latitude, longitude }) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );
    if (!res.ok) throw Error("Failed getting address");

    const data = await res.json();

    // Format address from API response
    const addressParts = [];
    if (data.locality) addressParts.push(data.locality);
    if (data.city) addressParts.push(data.city);
    if (data.postcode) addressParts.push(data.postcode);
    if (data.countryName) addressParts.push(data.countryName);

    const formattedAddress =
      addressParts.length > 0
        ? addressParts.join(", ")
        : `${data.latitude}, ${data.longitude}`;

    return formattedAddress;
  } catch (error) {
    throw new Error(error.message || "Failed to get address from coordinates");
  }
}
