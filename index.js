const ExcelJS = require('exceljs');
const path = require('path');
const { sendEmail } = require('./sendMail');
const { createEmail } = require('./content');

// Function to read data from Excel file
const readExcel = async (filePath) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
            const rowData = {};
            row.eachCell((cell, colNumber) => {
                rowData[worksheet.getRow(1).getCell(colNumber).value] = cell.value;
            });
            data.push(rowData);
        }
    });

    return { workbook, data };
};

// Function to write data to Excel file
const writeExcel = async (filePath, workbook) => {
    await workbook.xlsx.writeFile(filePath);
};

const filePath = path.join(__dirname, './emails.xlsx'); // Update the path if needed
readExcel(filePath).then(async ({ workbook, data: excelData }) => {
    for (const row of excelData) {
        const { subject, body } = createEmail(row.Name, row["Company Name"], row["Job Profile"], row["Job Id"]);
        const emailSent = await sendEmail(row.Email, subject, body, './VikasRariaResume.pdf', row.Name, row["Company Name"], row["Job Id"], row["Job Profile"]);
        
        if (emailSent) {
            moveToSentSheet(workbook, row);
        }
        // console.log(row);
    }

    await writeExcel(filePath, workbook);
});

// Function to move sent emails to a new sheet
async function moveToSentSheet(workbook, row) {
    const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    let worksheet = workbook.getWorksheet(date);

    if (!worksheet) {
        worksheet = workbook.addWorksheet(date);
        const headers = ["Email", "Name", "Company Name", "Job Profile", "Job Id", "Job Link", "Application Time"];
        const headerRow = worksheet.addRow(headers); // Add headers

        // Make headers bold and set column width
        headerRow.eachCell((cell, colNumber) => {
            cell.font = { bold: true };
            worksheet.getColumn(colNumber).width = 20; // Adjust the width as needed
        });
    }

    let data = Object.values(row);
    worksheet.addRow(data);
    await workbook.xlsx.writeFile('emails.xlsx');
}
