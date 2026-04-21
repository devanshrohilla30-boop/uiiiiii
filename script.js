let students = JSON.parse(localStorage.getItem("students")) || [];
let totalClasses = JSON.parse(localStorage.getItem("classes")) || 0;

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("classes", JSON.stringify(totalClasses));
}

function addStudent() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;

    if (!name || !roll) {
        alert("Fill all fields");
        return;
    }

    students.push({ name, roll, present: 0, total: 0 });
    saveData();
    displayStudents();
}

function markAttendance(index, isPresent) {
    students[index].total++;

    if (isPresent) {
        students[index].present++;
    }

    totalClasses++;
    saveData();
    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveData();
    displayStudents();
}

function getPercentage(p, t) {
    if (t === 0) return "0%";
    return ((p / t) * 100).toFixed(1) + "%";
}

function displayStudents(list = students) {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    list.forEach((s, i) => {
        table.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.roll}</td>
            <td>
                ${s.present}/${s.total} (${getPercentage(s.present, s.total)})
            </td>
            <td>
                <button class="present" onclick="markAttendance(${i}, true)">✔</button>
                <button class="absent" onclick="markAttendance(${i}, false)">❌</button>
                <button class="delete" onclick="deleteStudent(${i})">🗑</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("totalClasses").innerText = totalClasses;
}

function searchStudent() {
    let value = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(value) ||
        s.roll.toLowerCase().includes(value)
    );

    displayStudents(filtered);
}

displayStudents();
