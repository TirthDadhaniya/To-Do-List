const todoinput = document.getElementById("todo-input");
const todolist = document.getElementById("todo-list");
const todoform = document.getElementById("todo-form");

todoform.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoinput.value.trim() === "") {
    alert("Please enter a task");
  } else {
    const li = document.createElement("li");

    const squareIcon = document.createElement("img");
    squareIcon.src = "square.svg";
    squareIcon.style.width = "24px";
    squareIcon.style.height = "24px";
    squareIcon.style.marginRight = "14px";
    squareIcon.style.cursor = "pointer";

    const span = document.createElement("span");
    span.textContent = todoinput.value;
    span.style.flex = "1";
    span.style.cursor = "pointer";
    span.contentEditable = "false";

    span.addEventListener("click", () => {
      span.contentEditable = "true";
      span.focus();

      function finishEdit(e) {
        if (e.type === "blur" || (e.type === "keydown" && e.key === "Enter")) {
          span.contentEditable = "false";
          span.removeEventListener("blur", finishEdit);
          span.removeEventListener("keydown", finishEdit);
        }
      }
      span.addEventListener("blur", finishEdit);
      span.addEventListener("keydown", finishEdit);
    });

    const crossIcon = document.createElement("img");
    crossIcon.src = "cross.svg";
    crossIcon.alt = "Delete";
    crossIcon.className = "cross-icon";
    crossIcon.style.width = "24px";
    crossIcon.style.height = "24px";
    crossIcon.style.cursor = "pointer";
    crossIcon.style.marginLeft = "auto";

    squareIcon.addEventListener("click", () => {
      li.classList.toggle("checked");
      squareIcon.src = li.classList.contains("checked")
        ? "checked-square.svg"
        : "square.svg";
    });

    crossIcon.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(squareIcon);
    li.appendChild(span);
    li.appendChild(crossIcon);
    todolist.appendChild(li);

    todoinput.value = "";
  }
});
