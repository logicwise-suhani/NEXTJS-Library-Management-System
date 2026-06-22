
export default function Table({ columns = [], data = [], getRowKey = (index) => index }) {
    return (
        <table border="1" cellPadding="12px">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, index) => (
                    <tr key={getRowKey(row, index)}>
                        {columns.map((col) => (
                            <td key={col.key}>
                                {col.render
                                    ? col.render(row)
                                    : row?.[col.key] ?? "N/A"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}