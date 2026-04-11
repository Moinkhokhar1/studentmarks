let marksData = [];

const button = document.querySelector("button");
button.disabled = true;

fetch("marks.csv")
.then(response => response.text())
.then(data => {

    const rows = data.split("\n").slice(1);

    rows.forEach(row => {

        const cleanRow = row.replace("\r", "").trim();
        if (!cleanRow) return;

        const cols = cleanRow.split(",");

        marksData.push({
            enrollment: cols[0]?.trim(),
            branch: cols[1]?.trim(),
            name: cols[2]?.trim(),
            subject: cols[3]?.trim(),
            cet1: (!cols[4] || cols[4].trim() === "") ? "AB" : cols[4].trim(),
            cet2: (!cols[5] || cols[5].trim() === "") ? "AB" : cols[5].trim()
        });

    });

    button.disabled = false; // ✅ enable after load
});
