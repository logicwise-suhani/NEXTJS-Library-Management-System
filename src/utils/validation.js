export function validateUser(user, users = [], editUserId = null, isEdit = false) {
    const errors = {};

    const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;
    const userNamePattern = /^[A-Za-z0-9]+$/;

    if (!user.name?.trim()) {
        errors.name = "Name is required";
    } else if (!namePattern.test(user.name.trim())) {
        errors.name = "Name should start with a letter and contain only letters, spaces, hyphens, and apostrophes (2-50 characters)";
    }

    if (!user.userName?.trim()) {
        errors.userName = "Username is required";
    } else if (!userNamePattern.test(user.userName.trim())) {
        errors.userName = "Username must be only letters and numbers with no spaces";
    }

    if (!user.email?.trim()) {
        errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email.trim())) {
        errors.email = "Invalid email format";
    }

    if (!isEdit) {
        if (!user.password?.trim()) {
            errors.password = "Password is required";
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.password)
        ) {
            errors.password = "Password must contain uppercase, lowercase, number and be at least 8 characters";
        }
    } else if (
        user.password?.trim() &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.password)
    ) {
        errors.password = "Password must contain uppercase, lowercase, number and be at least 8 characters";
    }

    const contact = String(user.contact || "").trim();

    if (!contact) {
        errors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(contact)) {
        errors.contact = "Contact must be exactly 10 digits";
    }

    const email = user.email?.trim().toLowerCase();
    const userName = user.userName?.trim().toLowerCase();

    const duplicateUser = users.find((u) => {
        if (isEdit && u._id === editUserId) return false;

        return (
            u.email?.toLowerCase() === email ||
            u.userName?.toLowerCase() === userName ||
            String(u.contact).trim() === contact
        );
    });

    if (duplicateUser) {
        if (duplicateUser.email?.toLowerCase() === email) {
            errors.email = "Email already exists";
        }

        if (duplicateUser.userName?.toLowerCase() === userName) {
            errors.userName = "Username already exists";
        }

        if (String(duplicateUser.contact).trim() === contact) {
            errors.contact = "Contact number already exists";
        }
    }

    return errors;
}

export const validateBook = (book) => {
    const errors = {};

    if (!book.name.trim()) {
        errors.name = "Name is required";
    }

    if (!book.author.trim()) {
        errors.author = "Author is required";
    }

    if (!book.totalCopies) {
        errors.totalCopies = "Total copies is required";
    } else if (Number(book.totalCopies) < 1) {
        errors.totalCopies = "Total copies must be a positive number";
    }

    const SERIAL_REGEX = /^SN\d{3}$/;
    if (book.copies.some((copy) => !copy || copy.trim() === "")) {
        errors.copies = "Serial numbers cannot be empty";
    }
    const invalidSerials = book.copies.filter((copy) => !SERIAL_REGEX.test(copy));
    if (invalidSerials.length > 0) {
        errors.copies = "Invalid SN format (eg: SN001, SN002,....)";
    }

    const uniqueSerials = new Set(book.copies);
    if (uniqueSerials.size !== book.copies.length) {
        errors.copies = "Duplicate serial numbers are not allowed";
    }

    if (Number(book.totalCopies) !== book.copies.length) {
        errors.copies = "Total copies must match number of serial numbers";
    }
    return errors;
};

export const validate = (form) => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
        newErrors.email = "Email is required";
        valid = false;
    } else if (!emailRegex.test(form.email)) {
        newErrors.email = "Enter a valid email address";
        valid = false;
    }

    if (!form.password) {
        newErrors.password = "Password is required";
        valid = false;
    } else if (form.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        valid = false;
    }

    return { valid, newErrors };
};