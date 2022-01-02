export const getLikesCount = ({
  data,
}: {
  data: { [keyof: string]: string } | null | undefined;
}): number => {
  if (data) {
    return Object.keys(data).length;
  } else return 0;
};
