let marksData = [];

fetch("Result.csv")
.then(response => response.text())
.then(data => {
    const rows = data.split("\n").slice(1);

    rows.forEach(row => {
        const cols = row.split(",");

        if (cols.length >= 6) {
            marksData.push({
                enrollment: cols[0].trim(),
                branch: cols[1].trim(),
                name: cols[2].trim(),
                subject: cols[3].trim(),
                cet1: cols[4].trim(),
                cet2: cols[5].trim()
            });
        }
    });
});

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
            <td colspan="6" style="text-align:center; color:red;">
                No result found
            </td>
        </tr>`;
    } else {
        filtered.forEach(student => {
            const row = `
            <tr>
                <td>${student.enrollment}</td>
                <td>${student.branch}</td>
                <td>${student.name}</td>
                <td>${student.subject}</td>
                <td>${student.cet1}</td>
                <td>${student.cet2}</td>
            </tr>
            `;
            result.innerHTML += row;
        });
    }
}
