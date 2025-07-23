// src/modules/storage.js
import { Project } from './project.js';
import { Todo } from './todo.js';

const STORAGE_KEY = 'todoProjects';

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}


export function deleteProject(name) {
  const allProjects = loadProjects();
  const filtered = allProjects.filter(project => project.name !== name);
  saveProjects(filtered);
}



export function loadProjects() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  const parsed = JSON.parse(data);
  return parsed.map(project => {
    const proj = new Project(project.name);
    proj.todos = project.todos.map(todo => Object.assign(new Todo(), todo));
    return proj;
  });
}


export function deleteProjects(projects){
  const projectsa = loadProjects();
  const filtered = projectsa.filter(project => project.name !== name);
  saveProjects(filtered);
}
