let tasks = JSON.parse(localStorage.getItem("tasks")) || []

const addTask = document.getElementById("input-el")
const addTime = document.getElementById("time-el")
const addDate = document.getElementById("date-el")
const addBtn = document.getElementById("input-btn")
const editBtn = document.getElementById("edit-btn")
const taskList = document.getElementById("task")

function renderTasks() {
    taskList.innerHTML = ""
    tasks.forEach((task, index) => {
        taskList.innerHTML += `
            <li class="${task.done ? "done" : ""}">
                <strong>${task.text}</strong><br>
                📅 ${task.date} ⏰deadline[ ${task.time} ]
                <button onclick="toggleDone(${index})">
                    ${task.done ? "Undo" : "Done"}
                </button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Dekete</button>
                <br>
                
            </li>
        `
    })
}

addBtn.addEventListener("click", function () {
    if (addTask.value === "" || addDate.value === "" || addTime.value === "") return

    const newTask = {
        text: addTask.value,
        date: addDate.value,
        time: addTime.value,
        done: false
    }

    tasks.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    addTask.value = ""
    addDate.value = ""
    addTime.value = ""
    renderTasks()
})
editBtn.addEventListener("click",function(){
    if (newTask===null) {
        alert("Enter task first")
        
    } else {
        let name = prompt("enter the task name to be altered ")
        if (name===taskList.text) {
            let choice = prompt("which property to alter")
            switch(choice){
            case "name || Name":
            let newN = prompt("Enter the new task name")
            tasks.push(newN = newtask.name) 
            case "timee || Time":
            let newT = prompt("Enter the new task time")
            tasks.push(newN = newtask.time) 
            case "Date || date":
            let newD = prompt("Enter the new task date")
            tasks.push(newN = newtask.date) 
        }}
        else(
            alert(`No task exists by the ${name}`)
        )
        
    }

})
function deleteTask(index) {
    tasks.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    renderTasks()
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done
    localStorage.setItem("tasks", JSON.stringify(tasks))
    renderTasks()
}
function editTask(index) {
    const newText = prompt("Edit task name:")
    const newDate = prompt("Edit task date:")
    const newTime =  prompt("Edit task time:")
    if (newText && newDate && newTime) {
        tasks[index].text = newText
        tasks[index].date = newDate
        tasks[index].time = newTime
        localStorage.setItem("tasks",JSON.stringify(tasks))
        renderTasks()
    }
}
renderTasks()
