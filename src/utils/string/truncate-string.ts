export const truncateString = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
