import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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
    { key: "name", label: "Name" },
    { key: "author", label: "Author" },
    {
        key: "total",
        label: "Total Copies",
        render: (row) => row.copies.length,
    },
    {
        key: "issued",
        label: "Issued Copies",
        render: (row) =>
            row.copies.filter((c) => !c.isAvailable).length,
    },
    {
        key: "available",
        label: "Available Copies",
        render: (row) =>
            row.copies.filter((c) => c.isAvailable).length,
    },
];