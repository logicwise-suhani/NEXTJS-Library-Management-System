import { toast } from "react-toastify";

const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const Toast = {
    success: (message, options = {}) => {
        toast.success(message, { ...defaultOptions, ...options });
    },

    error: (message, options = {}) => {
        toast.error(message, { ...defaultOptions, ...options });
    },
};