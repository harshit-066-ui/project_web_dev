import { state } from "./global.js";

export function updateDashboard() {
  document.getElementById("total-tasks").textContent = state.tasks.length;
  document.getElementById("completed-tasks").textContent = state.tasks.filter(t => t.done).length;
  
  let s = state.focusSeconds;
  let text = "";
  if (s >= 3600) {
    const h = Math.floor(s / 3600);
    s %= 3600;
    const m = Math.floor(s / 60);
    s %= 60;
    text = `${h}h ${m}m ${s}s`;
  } else if (s >= 60) {
    const m = Math.floor(s / 60);
    s %= 60;
    text = `${m}m ${s}s`;
  } else {
    text = `${s}s`;
  }
  document.getElementById("focus-mode").textContent = text;
}
