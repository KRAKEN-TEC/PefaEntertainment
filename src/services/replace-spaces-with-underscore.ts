function replaceSpacesWithUnderscore(input: string) {
    if (input.includes(" ")) {
        return input.replace(/ /g, "_");
    }
    return input;
}

export default replaceSpacesWithUnderscore;