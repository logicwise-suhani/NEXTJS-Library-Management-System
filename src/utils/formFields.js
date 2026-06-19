const commonFields = {
    email:
        { name: "email", label: "Email", placeholder: "Email", type: "email", id: Date.now() + Math.random() },
    password:
        { name: "password", label: "Password", placeholder: "Password", type: "password", id: Date.now() + Math.random() },
}

export const createStudentFields = [
    { name: "name", label: "Name", placeholder: "Name", type: "text", id: Date.now() + Math.random() },
    { name: "userName", label: "UserName", placeholder: "Username", type: "text", id: Date.now() + Math.random() },
    // {
    //     name: "city", label: "City", type: "select", options: ["surat", "pune", "rajkot"],
    //     id: Date.now() + Math.random()
    // },
    {
        name: "city", label: "City", type: "radio", options: ["surat", "pune", "rajkot"],
        //  defaultValue: "pune",
        id: Date.now() + Math.random()
    },
    commonFields.email,
    commonFields.password,
    { name: "contact", label: "Contact", placeholder: "Contact", type: "text", id: Date.now() + Math.random() },
];

export const bookFields = [
    { name: "name", label: "Book Name", placeholder: "Book Name", type: "text", id: Date.now() + Math.random() },
    { name: "author", label: "Author", placeholder: "Author", type: "text", id: Date.now() + Math.random() },
    { name: "totalCopies", label: "Total Copies", placeholder: "Total Copies", type: "number", id: Date.now() + Math.random() },
]

export const issueFields = (users) => [
    {
        name: "userId",
        type: "select",
        options: users.users?.map(user => user) || [],
        id: Date.now() + Math.random()
    },
    {
        name: "dueDate",
        type: "date",
        id: Date.now() + Math.random()
    },
]

export const loginFields = [
    commonFields.email,
    commonFields.password,
    {
        name: "login", type: "select", options: ["admin", "student"], id: Date.now() + Math.random(),
    },
]

export const allFields = {
    addStudentForm: createStudentFields,
    addBookForm: bookFields,
    // loginForm: loginFields,
}