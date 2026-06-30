export const createMetadata = (title, description, url = "/", type = "website", image = "/libraryImage.jpg") => {

    const defaultTitle = "BookWorm";
    // const templateTitle = `%s | ${defaultTitle}`
    const authors = [{ name: "Monster" }, { name: "Whale" }];
    const openGraphTitle = "Online Library";
    const openGraphDescription = "Visit the library remotely"

    return {
        metadataBase: new URL("http://localhost:3000"),
        title: {
            default: title || defaultTitle,
            // template: templateTitle,
        },
        icons: {
            icon: "/LandingImage.webp"
        },
        description,
        authors: authors,
        keywords: ["Library Management System", "Library", "Book management", "Books"],
        openGraph: {
            title: title || openGraphTitle,
            description: description || openGraphDescription,
            siteName: defaultTitle,
            url,
            type,
            locale: "en_US",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: "BookWorm Library"
                },
            ],
        }
    }
}