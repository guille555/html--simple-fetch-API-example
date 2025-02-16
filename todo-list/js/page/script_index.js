import * as todo_controller from "../controller/todoController.js";
let list_todos = [];

const date = new Date();
const table_body = document.querySelector(".table_body");
const template_row_todo = document.getElementById("template_todo").content.querySelector("tr");
const fragment = document.createDocumentFragment();

const add_todo = (todo) => {
  const element = template_row_todo.cloneNode(true);
  element.querySelector("td.todo_id").textContent = todo.id;
  element.querySelector("td.todo_title").textContent = todo.title;
  element.querySelector("td > div > div.detail > i").dataset.id = todo.id;
  return element;
};

const show_todo = (todo) => {
  const container = document.querySelector(".todo_container");
  container.classList.add("todo_container--show");
  container.querySelector("form > div.form_field > input#title").value = todo.title;
  container.querySelector("form > div.form_field > textarea#todo_body").value = todo.body;
};

const save_todo = async (todo) => {
  let form = new FormData(todo);
  let data = Object.fromEntries(form);
  await todo_controller.addTodo(data);
};

const init_page = async () => {
  list_todos = await todo_controller.returnListTodos();
  list_todos.forEach((element) => {
    const todo = add_todo(element);
    fragment.append(todo);
  });
  while (table_body.firstChild) {
    table_body.removeChild(table_body.firstChild);
  }
  table_body.append(fragment);
  document.querySelector(".main > .container_table > .table > .table_footer > tr > td:last-child").textContent = list_todos.length;
};

document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  await save_todo(event.target);
  await init_page();
  event.target.reset();
});

document.querySelector(".table").addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    show_todo(list_todos[id - 1]);
  }
});

document.querySelector(".todo_container > form > .container_close_button > i").addEventListener("click", (event) => {
  event.target.parentElement.parentElement.parentElement.classList.remove("todo_container--show");
});

document.querySelector(".todo_container").addEventListener("click", (event) => {
  event.target.classList.remove("todo_container--show");
});

document.querySelector("footer > address > p").textContent += " " + date.getFullYear().toString();

window.addEventListener("load", async () => {
  await init_page();
});
