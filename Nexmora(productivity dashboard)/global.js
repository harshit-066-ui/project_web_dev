export const state = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  focusSeconds: Number(localStorage.getItem("totalTime")) || 0,
  totalSeconds: 0,
  initialSeconds: 0,
  selectedTask: null,
  clockInterval: null
};

export const taskInput = document.getElementById("input-el");
export const dateInput = document.getElementById("date-el");
export const timeInput = document.getElementById("time-el");
export const addButton = document.getElementById("input-btn");
export const taskList = document.getElementById("task");

export const timerDisplay = document.getElementById("timer-display");
export const startButton = document.getElementById("start-timer");
export const stopButton = document.getElementById("stop-timer");
export const resetButton = document.getElementById("reset-timer");
export const updateButton = document.getElementById("update-timer");

export const darkButton = document.getElementById("mode-toggle");
