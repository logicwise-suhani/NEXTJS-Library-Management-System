export const createMetadata = (title, description) => {

    const defaultTitle = "BookWorm";
    const templateTitle = `%s | ${defaultTitle}`
    const authors = [{ name: "Monster" }, { name: "Whale" }];

    return {
        title: {
            default: title || defaultTitle,
            template: templateTitle,
        },
        icons: {
            icon: "/LandingImage.webp"
        },
        description,
        authors: authors,
        keywords: ["Library Management System", "Library", "Book management", "Books"],
    }
}