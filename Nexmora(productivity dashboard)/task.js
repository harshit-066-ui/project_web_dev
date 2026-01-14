import { state, taskList } from "./global.js";
import * as interact from "./interact.js";

export function renderTasks(updateDashboard) {
  taskList.innerHTML = "";

  state.tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    if (i === state.selectedTask) li.classList.add("selected");
    li.draggable = true;
    li.innerHTML = `
      <strong>${task.text}</strong><br>
      📅 ${task.date} ⏰ ${task.time}<br>
      <button class="done-btn">${task.done ? "Undo" : "Done"}</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    li.querySelector(".done-btn").onclick = e => { e.stopPropagation(); toggleTaskDone(i, updateDashboard); };
    li.querySelector(".edit-btn").onclick = e => { e.stopPropagation(); editTask(i, updateDashboard); };
    li.querySelector(".delete-btn").onclick = e => { e.stopPropagation(); removeTask(i, updateDashboard); };
    li.onclick = () => state.selectedTask = i;

    li.addEventListener("dragstart", e => interact.handleDragStart(e, i));
    li.addEventListener("dragover", interact.handleDragOver);
    li.addEventListener("drop", e => interact.handleDrop(e, i));
    li.addEventListener("dragend", interact.handleDragEnd);

    taskList.appendChild(li);
  });

  updateDashboard();
}

export function addTask(task, updateDashboard) {
  state.tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  renderTasks(updateDashboard);
}

export function removeTask(i, updateDashboard) {
  state.tasks.splice(i, 1);
  if (state.selectedTask === i) state.selectedTask = null;
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  renderTasks(updateDashboard);
}

export function toggleTaskDone(i, updateDashboard) {
  state.tasks[i].done = !state.tasks[i].done;
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  renderTasks(updateDashboard);
}

export function editTask(i, updateDashboard) {
  const t = state.tasks[i];
  const text = prompt("Task?", t.text);
  const date = prompt("Date?", t.date);
  const time = prompt("Time?", t.time);
  if (!text || !date || !time) return;

  t.text = text;
  t.date = date;
  t.time = time;
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  renderTasks(updateDashboard);
}

