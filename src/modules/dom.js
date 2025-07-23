import { Project } from './project.js';
import { Todo } from './todo.js';
import { saveProjects, loadProjects, deleteProject } from './storage.js';
import alarmIconB from './assets/images/icons/time.png';
import alarmIconA from './assets/images/icons/alarm.png';
import { getDaysLeft, formatDat } from './date.js';

let projects = loadProjects();
if (projects.length === 0) {
  projects.push(new Project("Default"));
  saveProjects(projects);
}

let selectedProjectIndex = 0; // ✅ Keeps track of which project is active

export function renderProjects() {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    li.classList.add("box");

    li.innerHTML = `
      <span class="project-name">${project.name}</span>
      <button class="delete-btn">Delete</button>
    `;

    // ✅ Make entire li clickable for selecting project
    li.onmouseenter = (e) => {
      // Prevent click on delete button from triggering todo render
      if (e.target.classList.contains("delete-btn")) return;

      selectedProjectIndex = index;
      renderTodos(index);
    };

    // Delete button handler (kept as is)
    li.querySelector(".delete-btn").onclick = () => {
      deleteProjectUI(project.name);
    };

    projectList.appendChild(li);
  });
}



export function renderTodos(projectIndex) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  const project = projects[projectIndex];

  project.todos.forEach((todo, idx) => {
    const div = document.createElement("div");
    const formattedDate = formatDat(todo.dueDate);
    const daysLeft = getDaysLeft(todo.dueDate);

    const alarmIcon = daysLeft < 3 ? alarmIconB : alarmIconA;

    div.classList.add("todo-item", todo.priority);
    div.innerHTML = `
      <strong>${todo.title}</strong>  Description : ${todo.description}  
      <img src="${alarmIcon}" alt="Alarm Icon" style="width: 16px; vertical-align: middle; color:red;"> 
      ${daysLeft} days remaining Due: ${formattedDate}
      <span>
        <button onclick="editTodo(${projectIndex}, ${idx})">Edit</button>
        <button onclick="deleteTodo(${projectIndex}, ${idx})">Delete</button>
      </span>
    `;
    todoList.appendChild(div);
  });
}

window.editTodo = function (projectIndex, todoIndex) {
  const todo = projects[projectIndex].todos[todoIndex];
  alert(`Edit Todo: ${todo.title}`); // Replace with actual form logic
};

window.deleteTodo = function (projectIndex, todoIndex) {
  projects[projectIndex].removeTodo(todoIndex);
  saveProjects(projects);
  renderTodos(projectIndex);
};

export function setupAddProjectForm() {

  const form = document.getElementById("add-project-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = form.elements["project-name"].value;
    if (!name) return;
    projects.push(new Project(name));
    saveProjects(projects);
    renderProjects();



    selectedProjectIndex = projects.length - 1; // ✅ Set to new project's index
    renderTodos(selectedProjectIndex); 
   
    form.reset();
  };
}

export function setupAddTodoForm() {
  const form = document.getElementById("add-todo-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    const title = form.elements["title"].value;
    const description = form.elements["description"].value;
    const dueDate = form.elements["due-date"].value;
    const priority = form.elements["priority"].value;

    const projectIndex = selectedProjectIndex; // ✅ Use tracked project

    if (!projects[projectIndex]) {
      alert("Invalid project selected");
      return;
    }

    const todo = new Todo(title, description, dueDate, priority);
    projects[projectIndex].addTodo(todo);
    saveProjects(projects);
    renderTodos(projectIndex);
    form.reset();
  };
}

window.deleteProjectUI = function (projectName) {
  deleteProject(projectName);
  projects = loadProjects(); // Refresh from storage
  renderProjects();
  document.getElementById("todo-list").innerHTML = "";
};
