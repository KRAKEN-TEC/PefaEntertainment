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

export const stringSliceWith$ = (st: string) => {
  const [index, text] = st.split("$");
  return { index, text };
};
