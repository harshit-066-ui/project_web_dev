let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let focusSeconds = JSON.parse(localStorage.getItem("totalTime")) || 0;
let clockInterval = null;
const addTask = document.getElementById("input-el");
const addTime = document.getElementById("time-el");
const addDate = document.getElementById("date-el");
const addBtn = document.getElementById("input-btn");
const taskList = document.getElementById("task");

const StartTimer = document.getElementById("start-timer");
const StopTimer = document.getElementById("stop-timer");
const ResetTimer = document.getElementById("reset-timer");
const UpdateTimer = document.getElementById("update-timer");
let initialSeconds = 0;




function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
        <li 
        class="${task.done ? "done" : ""}" 
        draggable="true" 
        ondragstart="handleDragStart(event, ${index})"
        ondragover="handleDragOver(event)"
        ondrop="handleDrop(event, ${index})"
        ondragend="handleDragEnd(event)">
        <strong>${task.text}</strong><br>
        📅 ${task.date} ⏰ ${task.time}<br>
        <button onclick="toggleDone(${index})">
        ${task.done ? "Undo" : "Done"}
        </button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `;
    });

    updateDashboard();
}
function updateDashboard() {
    document.getElementById("total-tasks").textContent = tasks.length;
    document.getElementById("completed-tasks").textContent =
        tasks.filter(task => task.done).length;

    let seconds = focusSeconds;
    let displayText = "";

    if (seconds >= 3600) {
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        displayText = `${hours} hours ${minutes} minutes ${seconds} seconds`;
    }
    else if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        displayText = `${minutes} minutes ${seconds} seconds`;
    }
    else {
        displayText = `${seconds} seconds`;
    }

    document.getElementById("focus-mode").textContent = displayText;
}

addBtn.addEventListener("click", function () {
    if (!addTask.value || !addDate.value || !addTime.value) return;

    tasks.push({
        text: addTask.value,
        date: addDate.value,
        time: addTime.value,
        done: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTask.value = "";
    addDate.value = "";
    addTime.value = "";
    renderTasks();
});

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task name:", tasks[index].text);
    const newDate = prompt("Edit task date:", tasks[index].date);
    const newTime = prompt("Edit task time:", tasks[index].time);

    if (newText && newDate && newTime) {
        tasks[index].text = newText;
        tasks[index].date = newDate;
        tasks[index].time = newTime;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}



let totalSeconds = 0;

function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    document.getElementById("timer-display").textContent =
        hours + ":" + minutes + ":" + seconds;

}


function setTimer() {
    let hours = prompt("Enter hours");
    let minutes = prompt("Enter minutes");
    let seconds = prompt("Enter seconds");

    hours = Number(hours);
    minutes = Number(minutes);
    seconds = Number(seconds);

    totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    initialSeconds = totalSeconds
    localStorage.setItem("totalTime", JSON.stringify(initialSeconds))

    updateDisplay();
}


StartTimer.addEventListener("click", function () {
    if (clockInterval !== null) return;

    clockInterval = setInterval(function () {
        if (totalSeconds <= 0) {
            clearInterval(clockInterval);
            clockInterval = null;
            localStorage.setItem("totalTime", JSON.stringify(focusSeconds));
            return;
        }

        totalSeconds--;
        focusSeconds++;
        localStorage.setItem("totalTime", JSON.stringify(focusSeconds));
        updateDisplay();
        updateDashboard();
    }, 1000);
});


StopTimer.addEventListener("click", function () {
    clearInterval(clockInterval);
    clockInterval = null;
});


ResetTimer.addEventListener("click", function () {
    clearInterval(clockInterval);
    clockInterval = null;
    totalSeconds = initialSeconds;
    updateDisplay()
});


UpdateTimer.addEventListener("click", function () {
    setTimer();
});
let dragTask = null;

function handleDragStart(event, index) {
    dragTask = index;
    event.target.classList.add("dragging");
}

function handleDragOver(event) {
    event.preventDefault();
    event.target.classList.add("drag-over");
}

function handleDrop(event, dropIndex) {
    event.preventDefault();
    const items = document.querySelectorAll("#task li");
    items.forEach(item => item.classList.remove("drag-over", "dragging"));
    if (dragTask === null || dragTask === dropIndex) return;
    const draggedItem = tasks.splice(dragTask, 1)[0];
    tasks.splice(dropIndex, 0, draggedItem);
    dragTask = null;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function handleDragEnd(event) {
    event.target.classList.remove("dragging");
}

renderTasks();
updateDisplay();
updateDashboard();
