export const scroll = (
  direction: string,
  scrollContainer: HTMLDivElement,
  width: number
) => {
  if (direction === "left") {
    scrollContainer.scrollLeft -= width;
    console.log(scrollContainer.scrollLeft);
  } else {
    scrollContainer.scrollLeft += width;
    console.log(scrollContainer.scrollLeft);
  }
};
