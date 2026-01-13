import * as taskFn from "./task.js";
import * as timeFn from "./time.js";
import { state, taskInput, dateInput, timeInput, addButton, startButton, stopButton, resetButton, updateButton, darkButton } from "./global.js";
import { updateDashboard } from "./dashboard.js";

taskFn.renderTasks(updateDashboard);
timeFn.updateTimerDisplay();
updateDashboard();

addButton.onclick = () => {
  if (!taskInput.value || !dateInput.value || !timeInput.value) return;
  taskFn.addTask({
    text: taskInput.value.trim(),
    date: dateInput.value,
    time: timeInput.value,
    done: false
  }, updateDashboard);
  taskInput.value = dateInput.value = timeInput.value = "";
};

startButton.onclick = () => timeFn.startClock(updateDashboard);
stopButton.onclick = () => timeFn.stopClock();
resetButton.onclick = () => timeFn.resetClock();
updateButton.onclick = () => timeFn.setTimer();

darkButton.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  darkButton.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
};

if (JSON.parse(localStorage.getItem("darkMode"))) {
  document.body.classList.add("dark");
  darkButton.textContent = "Light Mode";
}
