import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Button from "@/components/Button/Button";
import styles from "@/app/admin/books/books.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);

const commonFields = {
    name: { key: "name", label: "Book" },
    author: { key: "author", label: "Author" },
    totalCopies: {
        key: "total",
        label: "Total Copies",
        render: (row) => row.copies.length,
    },
    issueFields: {
        key: "issued",
        label: "Issued Copies",
        render: (row) =>
            row.copies.filter((c) => !c.isAvailable).length,
    },
    availableCopies: {
        key: "available",
        label: "Available Copies",
        render: (row) =>
            row.copies.filter((c) => c.isAvailable).length,
    },
}

export const transactionColumns = [
    { key: "book", label: "Book", render: (row) => row?.book?.name ?? "N/A" },
    {
        key: "transactionType", label: "Book Status",
        render: (row) => row?.transactionType ? row?.transactionType : "N/A"
    },
    {
        key: "createdAt",
        label: "Issue Date",
        render: (row) =>
            row?.createdAt
                ? dayjs(row.createdAt).format("YYYY-MM-DD HH:mm:ss")
                : "N/A",
    },
    {
        key: "dueDate",
        label: "Due Date",
        render: (row) =>
            row?.dueDate
                ? dayjs(row.dueDate).format("YYYY-MM-DD HH:mm:ss")
                : "N/A",
    },
];

export const bookColumns = [
    commonFields.name,
    commonFields.author,
    commonFields.totalCopies,
    commonFields.issueFields,
    commonFields.availableCopies,
];

export const userColumns = (handleEditDialog, handleDelete) => [
    { key: "name", label: "Name" },
    { key: "userName", label: "userName" },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    {
        key: "action", label: "Action",
        render: (row) => (
            <div className="action-btns">
                <Button onClick={() => handleEditDialog(row)} label="Update" />
                <Button onClick={() => handleDelete(row._id)} label="Delete" />
            </div>
        )
    },
]

export const adminBookColumns = (setSelectedBookId, setSelectedSerial, setShowIssueModal, handleEditBookDialog, handleDeleteBook) => [
    commonFields.name,
    commonFields.author,
    commonFields.totalCopies,
    commonFields.issueFields,
    commonFields.availableCopies,
    {
        key: "copies",
        label: "Copies",
        render: (row) => (
            <div className={styles.issueBtns}>
                <Button
                    label="Issue"
                    onClick={() => {
                        setSelectedBookId(row._id);
                        setSelectedSerial(null);
                        setShowIssueModal("issue");
                    }}
                />

                <Button
                    label="Return"
                    onClick={() => {
                        setSelectedBookId(row._id);
                        setSelectedSerial(null);
                        setShowIssueModal("return");
                    }}
                />
            </div>
        )
    },
    {
        key: "action", label: "Action", render: (row) => (
            <div className={styles.actionBtns}>
                <Button onClick={() => handleEditBookDialog(row)} label="Update" />
                <Button onClick={() => handleDeleteBook(row._id)} label="Delete" />
            </div>
        )
    }
]