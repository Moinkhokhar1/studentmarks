let marksData = [];

fetch("Result.csv")
.then(response => response.text())
.then(data => {

    const rows = data.split("\n").slice(1);

    rows.forEach(row => {

        const cleanRow = row.replace("\r", "").trim();
        if (!cleanRow) return;

        const cols = cleanRow.split(",");

        // Safe extraction
        const enrollment = cols[0]?.trim();
        const branch = cols[1]?.trim();
        const name = cols[2]?.trim();
        const subject = cols[3]?.trim();

        let cet1 = cols[4]?.trim();
        let cet2 = cols[5]?.trim();

        // Handle missing / empty / AB
        cet1 = (!cet1 || cet1 === "") ? "AB" : cet1;
        cet2 = (!cet2 || cet2 === "") ? "AB" : cet2;

        marksData.push({
            enrollment,
            branch,
            name,
            subject,
            cet1,
            cet2
        });

    });
});

function parseMarks(value) {
    return value === "AB" ? 0 : Number(value);
}

function searchStudent() {

    const enrollment = document.getElementById("enrollment").value.trim();
    const result = document.getElementById("result");

    result.innerHTML = "";

    const filtered = marksData.filter(
        student => student.enrollment === enrollment
    );

    if (filtered.length === 0) {
        result.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center; color:red;">
                No result found
            </td>
        </tr>`;
    } else {

        filtered.forEach(student => {

            const total = parseMarks(student.cet1) + parseMarks(student.cet2);

            const row = `
            <tr>
                <td>${student.enrollment}</td>
                <td>${student.branch}</td>
                <td>${student.name}</td>
                <td>${student.subject}</td>
                <td>${student.cet1}</td>
                <td>${student.cet2}</td>
                <td>${total}</td>
            </tr>
            `;

            result.innerHTML += row;
        });
    }
}
