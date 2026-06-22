"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import { GetBooks } from "@/services/BookService";
import { GetTransaction } from "@/services/Transaction";
import { useEffect, useState } from "react";
import { Toast } from "@/utils/toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "./transaction.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Transaction() {
    const [transaction, setTransaction] = useState([]);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const handlePopState = () => {
            window.history.go(1);
        };
        window.addEventListener("popstate", handlePopState);
        window.history.pushState(null, "", window.location.href);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    useEffect(() => {
        async function handleTransaction() {
            try {
                const getTransaction = await GetTransaction({ page: 1, limit: 10 });
                setTransaction(getTransaction);
                const allBooks = await GetBooks();
                setBooks(allBooks.data);
            } catch (err) {
                Toast.error(err);
            }
        }
        handleTransaction();
    }, [])

    const filteredBooks = books.filter(
        (book) => book.name.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.studentDashboard}>
            <div className={styles.libraryText}>
                <h1>Welcome to Library!</h1>
                {transaction.length > 0 ? <p>
                    Logged as: <span>{transaction?.[0]?.user?.userName ?? "Loading..."}</span>
                </p> : <span>No transactions found for this user </span>}
            </div>

            <br /><br /> <br /> <br />
            {transaction.length > 0 ?
                <>
                    <p>Transactions</p>
                    <div className={styles.transactionStatus}>
                        {/* <Table
                            columns={transactionColumns}
                            data={transaction}
                            getRowKey={(row) => row._id}
                        /> */}
                        <table border="1" cellPadding="12px">
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Book Status</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transaction.map((tran) => (
                                    <tr key={tran._id}>
                                        <td>{tran?.book.name ? tran?.book.name : "N/A"}</td>
                                        <td>{tran?.transactionType ? tran?.transactionType : "N/A"}</td>
                                        <td>{tran?.createdAt ? dayjs(tran?.createdAt).format("YYYY-MM-DD HH:mm:ss") : "N/A"}</td>
                                        <td>{tran?.dueDate ? dayjs(tran?.dueDate).format("YYYY-MM-DD HH:mm:ss") : "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
                : null}

            <br />
            <div className={styles.viewBooks}>
                <SearchBar value={search} onChange={setSearch} />
                {/* <Table
                    columns={bookColumns}
                    data={filteredBooks}
                    getRowKey={(book) => book._id}
                /> */}
                <table border="1" cellPadding="12px">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Total Copies</th>
                            <th>Issued Copies</th>
                            <th>Available Copies</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book._id}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.copies.length}</td>
                                <td>{book.copies.filter(copy => !copy.isAvailable).length}</td>
                                <td>{book.copies.filter(copy => copy.isAvailable).length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}