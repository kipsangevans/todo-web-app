// src/toggleForms.js

export function setupFormToggleHandlers() {
  const toggleProjectBtn = document.getElementById("toggle-project-form");
  const projectForm = document.getElementById("add-project-form");

  const toggleTodoBtn = document.getElementById("toggle-todo-form");
  const todoForm = document.getElementById("add-todo-form");

  if (toggleProjectBtn && projectForm) {
    toggleProjectBtn.addEventListener("click", () => {
      projectForm.style.display = projectForm.style.display === "none" ? "block" : "none";
    });
  }

  if (toggleTodoBtn && todoForm) {
    toggleTodoBtn.addEventListener("click", () => {
      todoForm.style.display = todoForm.style.display === "none" ? "block" : "none";
    });
  }
}
