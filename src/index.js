// src/index.js
import { renderProjects, setupAddProjectForm, setupAddTodoForm } from './modules/dom.js';
import { setupFormToggleHandlers } from './modules/ui.js';
import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupAddProjectForm();
  setupAddTodoForm();
  setupFormToggleHandlers();
});
