// Roster Gen 2.0
document.getElementById('dutyCycleOption').addEventListener('change', function () {
    const dutyCyclePreset = document.getElementById('dutyCyclePreset');
    const dutyCycleCustom = document.getElementById('dutyCycleCustom');
    if (this.value === 'custom') {
        dutyCyclePreset.style.display = 'none';
        dutyCycleCustom.style.display = 'block';
    } else {
        dutyCyclePreset.style.display = 'block';
        dutyCycleCustom.style.display = 'none';
    }
});

document.getElementById('generateRosterBtn').addEventListener('click', function () {
    const numDays = parseInt(document.getElementById('numDays').value);
    const numStaff = parseInt(document.getElementById('numStaff').value);
    const dutyCycleOption = document.getElementById('dutyCycleOption').value;

    let dutyCycle;
    if (dutyCycleOption === 'preset') {
        dutyCycle = document.getElementById('dutyCycle').value.split(', ');
    } else {
        const daysOn = parseInt(document.getElementById('daysOn').value);
        const daysOff = parseInt(document.getElementById('daysOff').value);
        dutyCycle = [];
        for (let i = 0; i < daysOn; i++) {
            dutyCycle.push(i < 2 ? 'DY' : 'NY');
        }
        for (let i = 0; i < daysOff; i++) {
            dutyCycle.push('OFF');
        }
    }

    const rosterTable = document.getElementById('rosterTable');
    rosterTable.innerHTML = '';

    // Add first row: Week
    const weekRow = rosterTable.insertRow(0);
    weekRow.insertCell(0).innerText = "";
    weekRow.insertCell(1).innerText = "";
    weekRow.insertCell(2).innerText = "";
    for (let day = 1; day <= numDays; day++) {
        const cell = weekRow.insertCell(day + 2);
        cell.colSpan = Math.min(7, numDays - day); // Merge the next 7 columns or remaining days
        cell.innerText = `Week ${Math.ceil(day / 1)}`;
    }

    // Add second row: Day of the Week
    const dayRow = rosterTable.insertRow(1);
    dayRow.insertCell(0).innerText = "";
    dayRow.insertCell(1).innerText = "";
    dayRow.insertCell(2).innerText = "";
    const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let day = 1; day <= numDays; day++) {
        const cell = dayRow.insertCell(day + 2);
        cell.innerText = daysOfWeek[(day - 1) % 7];
    }

    // Add third row: Day of the Month
    const dateRow = rosterTable.insertRow(2);
    dateRow.insertCell(0).innerText = "Staff Name";
    dateRow.insertCell(1).innerText = "Rank";
    dateRow.insertCell(2).innerText = "Contact";
    for (let day = 1; day <= numDays; day++) {
        const cell = dateRow.insertCell(day + 2);
        cell.innerText = day;
    }

    // Add roster data
    for (let staffIndex = 0; staffIndex < numStaff; staffIndex++) {
        const row = rosterTable.insertRow(staffIndex + 3);
        const staffCell = row.insertCell(0);
        staffCell.innerText = `First + Surname`;

        const rankCell = row.insertCell(1);
        rankCell.innerText = `NO`;

        const phoneCell = row.insertCell(2);
        phoneCell.innerText = `020xxxxxxx`;

        const cycleStart = staffIndex % dutyCycle.length;
        for (let day = 0; day < numDays; day++) {
            const duty = dutyCycle[(day + cycleStart) % dutyCycle.length];
            const dutyCell = row.insertCell(day + 3);
            dutyCell.innerText = duty;
        }
    }

    document.getElementById('rosterPlaceholder').style.display = 'none';
    rosterTable.style.display = 'table';
    document.getElementById('downloadBtn').style.display = 'inline-block';
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const rosterTable = document.getElementById('rosterTable');
    const workbook = XLSX.utils.table_to_book(rosterTable, { sheet: "Roster" });
    XLSX.writeFile(workbook, 'duty_roster.xlsx');
});





// Simple Roster Gen V1.0
// document.getElementById('generateRosterBtn').addEventListener('click', function() {
//     // Get user inputs
//     const numDays = parseInt(document.getElementById('numDays').value);
//     const numStaff = parseInt(document.getElementById('numStaff').value);
//     const dutyCycle = document.getElementById('dutyCycle').value.split(', ');

//     // Generate the roster
//     let tableHtml = '<thead><tr><th>Staff</th>';
//     for (let day = 1; day <= numDays; day++) {
//         tableHtml += `<th>Day ${day}</th>`;
//     }
//     tableHtml += '</tr></thead><tbody>';

//     for (let staffIndex = 0; staffIndex < numStaff; staffIndex++) {
//         let row = `<tr><td>Staff ${staffIndex + 1}</td>`;
//         const cycleStart = staffIndex % dutyCycle.length;
//         for (let day = 0; day < numDays; day++) {
//             const duty = dutyCycle[(day + cycleStart) % dutyCycle.length];
//             row += `<td>${duty}</td>`;
//         }
//         row += '</tr>';
//         tableHtml += row;
//     }
//     tableHtml += '</tbody>';

//     // Replace placeholder with the generated table
//     document.getElementById('rosterTable').innerHTML = tableHtml;
//     document.getElementById('rosterTable').style.display = 'table';
//     document.getElementById('rosterPlaceholder').style.display = 'none';
// });
