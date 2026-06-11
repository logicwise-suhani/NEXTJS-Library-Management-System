export function validateUser(user, users = [], editUserId = null, isEdit = false) {
    const errors = {};

    if (!user.name?.trim()) {
        errors.name = "Name is required";
    }

    if (!user.userName?.trim()) {
        errors.userName = "Username is required";
    }

    if (!user.email?.trim()) {
        errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
        errors.email = "Invalid email format";
    }

    if (!isEdit && !user.password?.trim()) {
        errors.password = "Password is required";
    } else if (
        user.password &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.password)
    ) {
        errors.password =
            "Password must contain uppercase, lowercase, number and be 8+ chars";
    }

    const contact = String(user.contact || "");
    if (!contact.trim()) {
        errors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(contact)) {
        errors.contact = "Contact must be 10 digits";
    }

    const normalizedEmail = user.email?.trim().toLowerCase();
    const normalizedUserName = user.userName?.trim().toLowerCase();

    const isDuplicate = users.some((u) => {
        if (isEdit && u._id === editUserId) return false;

        return (
            u.email?.toLowerCase() === normalizedEmail ||
            u.userName?.toLowerCase() === normalizedUserName ||
            String(u.contact) === contact
        );
    });

    if (isDuplicate) {
        errors.duplicate = "User already exists";
    }

    return errors;
}