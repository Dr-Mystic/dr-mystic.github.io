let criteriaList = [];
let subjectList = [];

function addCriteria() {
    let name = document.getElementById("criteria_name").value;
    let weight = parseFloat(document.getElementById("criteria_weight").value);

    if (name === "" || isNaN(weight) || weight <= 0 || weight > 100) {
        alert("Please enter a valid criteria name and weight.");
        return;
    }

    criteriaList.push({ name, weight, obtained: 0, total: 0 });
    updateCriteriaTable();
}

function updateCriteriaTable() {
    let tableBody = document.querySelector("#criteria_table tbody");
    tableBody.innerHTML = "";

    criteriaList.forEach((criteria, index) => {
        let row = `<tr>
            <td>${criteria.name}</td>
            <td>${criteria.weight}</td>
            <td><input type="number" min="0" id="obtained_${index}" onchange="updateMarks(${index})"></td>
            <td><input type="number" min="1" id="total_${index}" onchange="updateMarks(${index})"></td>
            <td><button onclick="removeCriteria(${index})">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function updateMarks(index) {
    let obtained = parseFloat(document.getElementById(`obtained_${index}`).value) || 0;
    let total = parseFloat(document.getElementById(`total_${index}`).value) || 1;
    criteriaList[index].obtained = obtained;
    criteriaList[index].total = total;
}

function removeCriteria(index) {
    criteriaList.splice(index, 1);
    updateCriteriaTable();
}

function calculateGPA() {
    let totalWeight = criteriaList.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight !== 100) {
        alert("Total weight must be exactly 100%");
        return;
    }

    let weightedSum = 0;
    for (let criteria of criteriaList) {
        let percentage = (criteria.obtained / criteria.total) * 100;
        weightedSum += (percentage * criteria.weight / 100);
    }

    let gpa = weightedSum >= 86 ? 4.00 :
              weightedSum >= 82 ? 3.67 :
              weightedSum >= 78 ? 3.33 :
              weightedSum >= 74 ? 3.00 :
              weightedSum >= 70 ? 2.67 :
              weightedSum >= 66 ? 2.33 :
              weightedSum >= 62 ? 2.00 :
              weightedSum >= 58 ? 1.67 :
              weightedSum >= 54 ? 1.33 :
              weightedSum >= 50 ? 1.00 : 0.00;

    document.getElementById("gpa_result").innerHTML = `<h2>Your GPA: ${gpa.toFixed(2)}</h2>`;
}

// CGPA Calculation
function addSubject() {
    let gpa = parseFloat(document.getElementById("subject_gpa").value);
    let credits = parseFloat(document.getElementById("subject_credits").value);

    if (isNaN(gpa) || gpa < 0 || gpa > 4 || isNaN(credits) || credits <= 0) {
        alert("Please enter a valid GPA (0-4) and credit hours.");
        return;
    }

    subjectList.push({ gpa, credits });
    updateSubjectTable();
}

function updateSubjectTable() {
    let tableBody = document.querySelector("#subject_table tbody");
    tableBody.innerHTML = "";

    subjectList.forEach((subject, index) => {
        let row = `<tr>
            <td>${subject.gpa}</td>
            <td>${subject.credits}</td>
            <td><button onclick="removeSubject(${index})">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function removeSubject(index) {
    subjectList.splice(index, 1);
    updateSubjectTable();
}

function calculateCGPA() {
    let totalWeightedGPA = subjectList.reduce((sum, s) => sum + (s.gpa * s.credits), 0);
    let totalCredits = subjectList.reduce((sum, s) => sum + s.credits, 0);

    let cgpa = totalWeightedGPA / totalCredits || 0;

    document.getElementById("cgpa_result").innerHTML = `<h2>Your CGPA: ${cgpa.toFixed(2)}</h2>`;
}
