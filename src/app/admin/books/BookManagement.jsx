"use client"

import useBooks from "@/hooks/useBooks";

export default function BookManagement({ initialBooks = [] }) {
    const { books } = useBooks(initialBooks);

    return (
        <>
            <h2>Book Management</h2>

            <div className="view-books">
                <table border={1} cellPadding={12}>
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Total Copies</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.totalCopies}</td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
        </>
    )
}