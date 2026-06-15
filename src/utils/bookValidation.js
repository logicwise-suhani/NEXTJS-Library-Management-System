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