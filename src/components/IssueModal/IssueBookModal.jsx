import { useState } from "react";
import Button from "@/components/Button/Button";
import Form from "../Form/Form";
import styles from "./modal.module.css";

function IssueBookModal({ users, book, mode, onIssue, onReturn, onClose }) {
    const [formState, setFormState] = useState({
        userId: "",
        dueDate: "",
        serialNumber: "",
        errors: {}
    })

    const availableCopies = book?.copies?.filter(c => c.isAvailable);
    const issuedCopies = book?.copies?.filter(c => !c.isAvailable);

    const serialOptions = mode === "issue" ? (availableCopies || []) : (issuedCopies || []);

    const validate = () => {
        const newErrors = {};

        if (!formState.serialNumber) {
            newErrors.serialNumber = "Please select a serial number";
        }

        if (mode === "issue") {
            if (!formState.userId) newErrors.userId = "Please select a user";
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
        }

        setFormState((prev) => ({
            ...prev,
            errors: newErrors
        }))
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const payload = {
            bookId: book._id,
            serialNumber: formState.serialNumber,
        };

        if (mode === "issue") {
            onIssue({
                ...payload,
                userId: formState.userId,
                dueDate: formState.dueDate,
            });
        } else {
            onReturn(payload);
        }
    };

    return (
        <div className={styles.modal}>
            {/* <Form
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
            <Button label="Cancel" onClick={onClose} /> */}

            <select
                name="serialNumber"
                value={formState.serialNumber}
                onChange={(e) =>
                    setFormState(prev => ({
                        ...prev,
                        serialNumber: e.target.value,
                    }))
                }
            >
                <option value="">Select Serial Number</option>
                {serialOptions?.map(c => (
                    <option key={c._id} value={c.serialNumber}>
                        {c.serialNumber}
                    </option>
                ))}
            </select>

            {formState.errors.serialNumber && (
                <p style={{ color: "red" }}>{formState.errors.serialNumber}</p>
            )}

            {mode === "issue" && (
                <>
                    <select
                        name="userId"
                        value={formState.userId}
                        onChange={(e) =>
                            setFormState(prev => ({
                                ...prev,
                                userId: e.target.value,
                                errors: {}
                            }))
                        }
                    >
                        <option value="">Select User</option>
                        {users?.users?.map(u => (
                            <option key={u._id} value={u._id}>
                                {u.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        name="dueDate"
                        value={formState.dueDate}
                        onChange={(e) =>
                            setFormState(prev => ({
                                ...prev,
                                dueDate: e.target.value,
                                errors: {}
                            }))
                        }
                    />
                </>
            )}

            <Button
                label={mode === "issue" ? "Issue" : "Return"}
                onClick={handleSubmit}
            />

            <Button label="Cancel" onClick={onClose} />
        </div>
    );
}

export default IssueBookModal;