export const scroll = (
  direction: string,
  scrollContainer: HTMLDivElement,
  width: number
) => {
  if (direction === "left") {
    scrollContainer.scrollLeft -= width;
  } else {
    scrollContainer.scrollLeft += width;
  }
};
