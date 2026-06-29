export const createMetadata = (title, description) => {

    const defaultTitle = "BookWorm";
    const templateTitle = `%s | ${defaultTitle} `

    return {
        title: {
            default: title || defaultTitle,
            template: templateTitle,
        },
        icons: {
            icon: "/LandingImage.webp"
        },
        description,
    }
}