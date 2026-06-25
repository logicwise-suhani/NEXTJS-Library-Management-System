export default function sitemap() {
    return [
        {
            url: "http://localhost:3000",
            lastModified: new Date(),
        },

        {
            url: "http://localhost:3000/admin",
            lastModified: new Date(),
        },

        {
            url: "http://localhost:3000/admin/books",
            lastModified: new Date(),
        },

        {
            url: "http://localhost:3000/admin/users",
            lastModified: new Date(),
        },

        {
            url: "http://localhost:3000/user",
            lastModified: new Date(),
        },

    ]
}