import { useState } from "react";
import Button from "@/components/Button/Button";
import Form from "../Form/Form";
import { issueFields } from "@/utils/formFields";
import styles from "./modal.module.css";

function IssueBookModal({ users, serialNumber, onIssue, onClose }) {
    const [formState, setFormState] = useState({
        userId: "",
        dueDate: "",
        errors: {}
    })

    const validate = () => {
        const newErrors = {};

        if (!formState.userId) {
            newErrors.userId = "Please select a user";
        }

        if (!formState.dueDate) {
            newErrors.dueDate = "Please select a due date";
        } else {
            const selectedDate = new Date(formState.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.dueDate = "Due date cannot be in the past";
            }
        }

        setFormState((prev) => ({
            ...prev,
            errors: newErrors
        }))
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onIssue({
            userId: formState.userId,
            dueDate: formState.dueDate,
            serialNumber
        });
        console.log(formState.userId)
    };

    const fields = issueFields(users || []);

    return (
        <div className={styles.modal}>
            <Form
                fields={fields}
                values={formState.userId}
                onChange={(e) => {
                    console.log("Target name", [e.target.name])
                    setFormState((prev) => ({
                        ...prev,
                        errors: {},
                        [e.target.name]: e.target.value
                    }))
                    console.log("Target value", e.target.value)
                }}
                errors={formState.errors}
            />

            <Button label="Issue" onClick={handleSubmit} />
            <Button label="Cancel" onClick={onClose} />
        </div>
    );
}

export default IssueBookModal;