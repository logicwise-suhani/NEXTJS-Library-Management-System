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