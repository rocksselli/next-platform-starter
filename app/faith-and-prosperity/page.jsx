import { fetchGoogleSheetData } from "../utils/fetchGoogleSheet";

export default async function FaithAndProsperity() {
    const data = await fetchGoogleSheetData({
        selectedColumns: [0, 2, 3, 4], // Select columns A, C, D
        skipHeaderRow: true // Optional: skip first row
    });

    return (
        <main className="min-h-screen flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-6">Faith and Prosperity</h1>
            {data.length > 0 ? (
                <table className="table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            {data[0].map((header, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available from Google Sheet.</p>
            )}
        </main>
    );
}
