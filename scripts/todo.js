"use strict";

const btnAddEl = document.getElementById("btn-add");
const inputTaskEl = document.getElementById("input-task");
const todoListEl = document.getElementById("todo-list");
const currentUserTodoArr = [];

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
  renderTask() {
    const li = document.createElement("li");
    if (this.isDone) li.className = "checked";
    li.setAttribute("data-task", this.task);
    li.innerHTML = `${this.task}<span class='close'>x</span>`;

    todoListEl.appendChild(li);
  }
}
const instanceTodoArr = todoArr ? todoArr.map((todo) => parseTask(todo)) : [];
// Create instance of Task from data
function parseTask(task) {
  const tsk = new Task(task.task, task.owner, task.isDone);

  return tsk;
}

// Set the item checked when user click it on
function setCheckedTask(e) {
  const task = instanceTodoArr.find(
    (todo) =>
      todo.owner === currentUser.username && todo.task === e.target.dataset.task
  );
  task.isDone = !task.isDone;

  saveToStorage(TODO, JSON.stringify(instanceTodoArr));
  e.target.classList.toggle("checked");
}

//Init page function
(function initialtion() {
  checkLogin();

  instanceTodoArr.map((todo) => {
    if (todo.owner === currentUser.username) currentUserTodoArr.push(todo);
  });

  currentUserTodoArr.map((task) => {
    task.renderTask();
  });
})();

//Add new task to todo list, task is unique  in a user
btnAddEl.addEventListener("click", function () {
  let task = inputTaskEl.value.trim();
  if (!task) {
    alert("Please enter task");
    return;
  }
  task = task[0].toUpperCase() + task.slice(1);
  if (currentUserTodoArr.findIndex((todo) => todo.task === task) >= 0) {
    alert("This task have exist!");
    return;
  }
  const todo = new Task(task, currentUser.username, false);
  currentUserTodoArr.push(todo);
  instanceTodoArr.push(todo);
  saveToStorage(TODO, JSON.stringify(instanceTodoArr));
  todo.renderTask();
  inputTaskEl.value = "";
});

//Close task function
todoListEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("close")) {
    if (confirm("Are you sure?")) {
      const todoIndex = instanceTodoArr.findIndex(
        (todo) =>
          todo.owner === currentUser.username &&
          todo.task === e.target.parentElement.dataset.task
      );
      instanceTodoArr.splice(todoIndex, 1);
      saveToStorage(TODO, JSON.stringify(instanceTodoArr));
      e.target.parentElement.remove();
    }
  } else setCheckedTask(e);
});
