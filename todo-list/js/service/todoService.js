import * as store from "../store/todoStore.js";
let data = [];

const fetchListTodos = async () => {
  let request = await fetch("https://jsonplaceholder.typicode.com/posts");
  let response = await request.json();
  return response;
};

const saveTodo = async (todo) => {
  let request = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(todo)
  });
  let response = await request.json();
  return response;
};

export const addTodo = async (todo) => {
  let response = await saveTodo(todo);
  data = await fetchListTodos();
  if (response.id === 101) {
    data.push(response);
    store.createTodoStore(data);
  }
};

export const returnListTodos = async () => {
  if (data.length === 0) {
    data = await fetchListTodos();
    store.createTodoStore(data);
  }
  let info = store.returnTodoStore();
  return info.list;
};
