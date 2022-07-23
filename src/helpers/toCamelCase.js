export function toCamelCase(str) {
  const words = str.split(" ");

  return words
    .map((word) => {
      if (word) {
        return word[0]?.toUpperCase() + word.substring(1);
      }
    })
    .join(" ");
}
