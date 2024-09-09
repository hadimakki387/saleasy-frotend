// Cache object to store fetched images
const imageCache: { [key: string]: string } = {};

export const getImageById = async (
  id: string,
  callback: (base64data: string | null) => void
): Promise<void> => {
  try {
    // Check if the image is already in the cache
    if (imageCache[id]) {
      // If found, return the cached image
      callback(imageCache[id]);
      return;
    }

    // Fetch the image from the API if not in cache
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/media/get/${id}`
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch image with id: ${id}`);
    }

    // Convert the response to a Blob (binary data)
    const imageBlob = await response.blob();

    // Create a FileReader to convert the Blob to a base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // Cache the image data after reading
      imageCache[id] = base64data;
      callback(base64data); // Return the result via the callback
    };
    reader.onerror = (error) => {
      callback(null); // Handle the error and pass null back to the callback
      console.error(`Failed to read the image blob: ${error}`);
    };

    // Read the Blob as a data URL (base64)
    reader.readAsDataURL(imageBlob);
  } catch (error) {
    console.error(`Error fetching image by id: ${id}`, error);
    callback(null); // Handle the error and pass null back to the callback
  }
};
