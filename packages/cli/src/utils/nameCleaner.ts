export const cleanComponentName = (name: string): string | undefined => {
  if (name)
    return name
      .replace(/[^a-zA-Z0-9\s]/g, "") // Remove unwanted symbols
      .trim() // Trim leading and trailing spaces
      .replace(/\s+/, " ") // Replace multiple spaces with a single space
      .split(" ") // Split by space
      .map((word, index) => {
        // Capitalize the first letter of each word except the first word
        return index === 0
          ? word.charAt(0).toLowerCase() + word.slice(1)
          : word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(""); // Join back to a single string
};
