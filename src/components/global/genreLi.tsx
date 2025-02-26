export const genreLi = (des: string, id?: string, classes?: string) => {
  return (
    <li className={classes} key={id}>
      {des}
    </li>
  );
};
