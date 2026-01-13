import { tasks, setDraggedTask, getDraggedTask, setSelectedTask } from "./global.js";
import * as taskFn from "./task.js";

export function handleDragStart(e, index) {
    setDraggedTask(index);
    e.currentTarget.classList.add("dragging");
}

export function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
}

export function handleDrop(e, dropIndex) {
    e.preventDefault();
    const dragged = getDraggedTask();
    if (dragged === null || dragged === dropIndex) return;

    const moved = tasks.splice(dragged, 1)[0];
    tasks.splice(dropIndex, 0, moved);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setDraggedTask(null);
    taskFn.renderTasks(taskFn); // pass required functions
}

export function handleDragEnd(e) {
    e.currentTarget.classList.remove("dragging");
}

export function selectTask(index) {
    setSelectedTask(index);
}

