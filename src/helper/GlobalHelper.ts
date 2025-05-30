
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

export const stringSlice = (st: string, sliceVal: string) => {
  const [front, end] = st.split(sliceVal);
  return { front, end };
};

export const stringSliceFrontOnly = (st: string, sliceVal: string) => {
  return st.split(sliceVal)[0];
};

export const stringSliceBackOnly = (st: string, sliceVal: string) => {
  return st.split(sliceVal)[1];
};

export const numberChecker = (
  num1: number,
  num2: number,
  comparationOperator: string
): boolean => {
  switch (comparationOperator) {
    case ">":
      return num1 > num2;
    case "<":
      return num1 < num2;
    case ">=":
      return num1 >= num2;
    case "<=":
      return num1 <= num2;
    case "==":
      return num1 == num2;
    case "===":
      return num1 === num2;
    case "!=":
      return num1 != num2;
    case "!==":
      return num1 !== num2;
    default:
      throw new Error("Invalid comparison operator");
  }
};
