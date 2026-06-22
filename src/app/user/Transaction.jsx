"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import { GetBooks } from "@/services/BookService";
import { GetTransaction } from "@/services/Transaction";
import { useEffect, useState } from "react";
import { Toast } from "@/utils/toast";
import styles from "./transaction.module.css";
import Table from "@/components/Table/Table";
import { bookColumns, transactionColumns } from "@/utils/tableFields";

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
                        <Table
                            columns={transactionColumns}
                            data={transaction}
                            getRowKey={(row) => row._id}
                        />
                    </div>
                </>
                : null}

            <br />
            <div className={styles.viewBooks}>
                <SearchBar value={search} onChange={setSearch} />
                <Table
                    columns={bookColumns}
                    data={filteredBooks}
                    getRowKey={(book) => book._id}
                />
            </div>
        </div >
    )
}