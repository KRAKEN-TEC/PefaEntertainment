const generateSlug = (title: string): string => {
    return title
        .toLowerCase() // Convert to lowercase
        .trim() // Remove spaces at the start and end
        .replace(/[^a-z0-9 -]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export default generateSlug;