export default function toCamelCase(title: string): string {
  return title
    .split(" ") // Split the string into an array of words
    .map((word, index) => {
      if (index === 0) {
        // Convert the first word to lowercase
        return word.toLowerCase();
      }
      // Capitalize the first letter of the subsequent words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(""); // Join the words back into a single string
}
