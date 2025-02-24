export const genreLi = (id?: string, des: string, classes?: string) => {
    return (
        <li className={classes} key={id}>{des}</li>
    )
}