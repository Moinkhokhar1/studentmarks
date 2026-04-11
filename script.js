let marksData = [];

fetch("Result.csv")
.then(response => response.text())
.then(data => {

    const rows = data.split("\n").slice(1);

    rows.forEach(row => {

        // Fix CRLF issue
        const cleanRow = row.replace("\r", "").trim();

        if (!cleanRow) return; // skip empty rows

        const cols = cleanRow.split(",");

        // Debug (optional)
        // console.log(cols);

        if (cols.length >= 6) {
            marksData.push({
                enrollment: cols[0],
                branch: cols[1],
                name: cols[2],
                subject: cols[3],
                cet1: cols[4] || "0",
                cet2: cols[5] || "0"
            });
        }
    });
});
