const todoinput = document.getElementById("todo-input");
const todolist = document.getElementById("todo-list");
const todoform = document.getElementById("todo-form");

// Load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", loadTasks);

todoform.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoinput.value.trim() === "") {
    alert("Please enter a task");
  } else {
    addTask(todoinput.value);
    todoinput.value = "";
  }
});

function addTask(text, checked = false) {
  const li = document.createElement("li");

  const squareIcon = document.createElement("img");
  squareIcon.src = checked ? "checked-square.svg" : "square.svg";
  squareIcon.style.width = "24px";
  squareIcon.style.height = "24px";
  squareIcon.style.marginRight = "14px";
  squareIcon.style.cursor = "pointer";

  const span = document.createElement("span");
  span.textContent = text;
  span.style.flex = "1";
  span.style.cursor = "pointer";
  span.contentEditable = "false";

  if (checked) li.classList.add("checked");

  // Edit task text
  span.addEventListener("click", () => {
    span.contentEditable = "true";
    span.focus();

    function finishEdit(e) {
      if (e.type === "blur" || (e.type === "keydown" && e.key === "Enter")) {
        span.contentEditable = "false";
        span.removeEventListener("blur", finishEdit);
        span.removeEventListener("keydown", finishEdit);
        saveTasks();
      }
    }
    span.addEventListener("blur", finishEdit);
    span.addEventListener("keydown", finishEdit);
  });

  // Toggle checked state
  squareIcon.addEventListener("click", () => {
    li.classList.toggle("checked");
    squareIcon.src = li.classList.contains("checked")
      ? "checked-square.svg"
      : "square.svg";
    saveTasks();
  });

  // Delete task
  const crossIcon = document.createElement("img");
  crossIcon.src = "cross.svg";
  crossIcon.alt = "Delete";
  crossIcon.className = "cross-icon";
  crossIcon.style.width = "24px";
  crossIcon.style.height = "24px";
  crossIcon.style.cursor = "pointer";
  crossIcon.style.marginLeft = "auto";
  crossIcon.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(squareIcon);
  li.appendChild(span);
  li.appendChild(crossIcon);
  todolist.appendChild(li);

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  todolist.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const checked = li.classList.contains("checked");
    tasks.push({ text, checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  todolist.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => addTask(task.text, task.checked));
}
