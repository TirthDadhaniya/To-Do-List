document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText) {
      const li = document.createElement("li");
      li.textContent = todoText;
      li.addEventListener("click", () => {
        li.classList.toggle("completed");
      });
      todoList.appendChild(li);
      input.value = "";
    }
  });
});
