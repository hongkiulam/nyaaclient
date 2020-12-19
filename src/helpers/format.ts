export const formatFileSize = (sizeInBytes: number) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let counter = 0;
  let formatted = sizeInBytes;
  while (formatted > 1024) {
    formatted = formatted / 1024;
    counter++;
  }
  return formatted.toFixed(1) + units[counter];
};
export const capitalise = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};
