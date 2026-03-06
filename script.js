let marksData = [];

fetch("marks.csv")
.then(response => response.text())
.then(data => {
    const rows = data.split("\n").slice(1);

    rows.forEach(row => {
        const cols = row.split(",");
        marksData.push({
            enrollment: cols[0],
            branch: cols[1],
            name: cols[2],
            subject: cols[3],
            marks: cols[4]
        });
    });
});

function searchStudent() {

    const enrollment = document.getElementById("enrollment").value;
    const result = document.getElementById("result");

    result.innerHTML = "";

    const filtered = marksData.filter(student => student.enrollment === enrollment);

    if (filtered.length === 0) {
        const noResultRow = `
        <tr>
        <td colspan="5" style="text-align: center; color: red;">No result found</td>
        </tr>
        `;
        result.innerHTML = noResultRow;
    } else {
        filtered.forEach(student => {

            const row = `
            <tr>
            <td>${student.enrollment}</td>
            <td>${student.branch}</td>
            <td>${student.name}</td>
            <td>${student.subject}</td>
            <td>${student.marks}</td>
            </tr>
            `;

            result.innerHTML += row;

        });
    }

}