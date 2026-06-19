import { useState } from "react";
import Button from "@/components/Button/Button";
import Form from "../Form/Form";
import { issueFields } from "@/utils/formFields";

function IssueBookModal({ users, serialNumber, onIssue, onClose }) {

    const [formState, setFormState] = useState({
        userId: "",
        dueDate: "",
        errors: {}
    })
    // const [userId, setUserId] = useState("");
    // const [dueDate, setDueDate] = useState("");
    // const [errors, setErrors] = useState({});

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

        // setErrors(newErrors);
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
        <div className="modal">
            <Form
                fields={fields}
                values={formState.userId}
                onChange={(e) => {
                    setErrors({});
                    console.log("Target name", [e.target.name])
                    setFormState((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value
                    }))
                    console.log("Target value", e.target.value)
                    // setUserId(e.target.value);
                    // setDueDate(e.target.value);
                }}
                errors={formState.errors}
            />

            {/* <div>
                <select
                    value={userId}
                    onChange={(e) => {
                        setErrors({});
                        setUserId(e.target.value)
                    }}
                >
                    <option value="">Select User</option>
                    {users.users?.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                {errors.userId && (
                    <p style={{ color: "red" }}>{errors.userId}</p>
                )}
            </div>

            <div>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => {
                        setErrors({});
                        setDueDate(e.target.value)
                    }}
                />
                {errors.dueDate && (
                    <p style={{ color: "red" }}>{errors.dueDate}</p>
                )}
            </div> */}

            <Button label="Issue" onClick={handleSubmit} />
            <Button label="Cancel" onClick={onClose} />
        </div>
    );
}

export default IssueBookModal;