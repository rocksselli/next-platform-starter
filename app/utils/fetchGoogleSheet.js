import { google } from "googleapis";

const SHEET_ID = "10mcJrBm_YaQoK5IHbY6aAFWlZxRcBfHfGbjmhHgZV7g"; // Replace with your Google Sheet ID

async function getSheetRange(sheets, sheetId) {
    const metadata = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const sheet = metadata.data.sheets.find(sheet => sheet.properties.title === "ENG");
    if (!sheet) throw new Error('Sheet "ENG" not found.');
    const rowCount = sheet.properties.gridProperties.rowCount;
    return `ENG!A1:G${rowCount}`;
}

export async function fetchGoogleSheetData(options = {}) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const RANGE = await getSheetRange(sheets, SHEET_ID);

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: RANGE,
        });

        let data = response.data.values || [];

        // Skip header row if specified
        if (options.skipHeaderRow) {
            data = data.slice(1);
        }

        // Select specific columns if specified
        if (options.selectedColumns && options.selectedColumns.length > 0) {
            data = data.map(row =>
                options.selectedColumns.map(colIndex => row[colIndex])
            );
        }

        return data;
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        return [];
    }
}
