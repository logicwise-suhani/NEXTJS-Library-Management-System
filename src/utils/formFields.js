const commonFields = {
    email:
        { name: "email", label: "Email", placeholder: "Email", type: "email" },
    password:
        { name: "password", label: "Password", placeholder: "Password", type: "password" },
}

export const createStudentFields = [
    { name: "name", label: "Name", placeholder: "Name", type: "text" },
    { name: "userName", label: "UserName", placeholder: "Username", type: "text" },
    // {
    //     name: "city", label: "City", type: "select", options: ["surat", "pune", "rajkot"],
    // },
    commonFields.email,
    commonFields.password,
    { name: "contact", label: "Contact", placeholder: "Contact", type: "text" },
];

export const bookFields = [
    { name: "name", label: "Book Name", placeholder: "Book Name", type: "text" },
    { name: "author", label: "Author", placeholder: "Author", type: "text" },
    { name: "totalCopies", label: "Total Copies", placeholder: "Total Copies", type: "number" },
]

export const issueFields = (users) => [
    {
        name: "userId",
        type: "select",
        options: users.users?.map(user => user) || [],
    },
    {
        name: "dueDate",
        type: "date",
    },
]

export const loginFields = [
    commonFields.email,
    commonFields.password,
    {
        name: "login", type: "radio", options: ["admin", "user"]
    },
]

export const allFields = {
    addStudentForm: createStudentFields,
    addBookForm: bookFields,
}