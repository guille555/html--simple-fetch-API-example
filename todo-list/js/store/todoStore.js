import { todo } from "../model/todo.js";

const parseData = (data) => {
  const newTodo = structuredClone(todo);
  newTodo.id = data.id;
  newTodo.title = data.title;
  newTodo.body = data.body;
  return newTodo;
};

const parseListData = (elements) => {
  const list = elements.map((element) => {
    const data = parseData(element);
    return data;
  });
  return list;
};

export const createTodoStore = (dataList) => {
  let data;
  let store = {
    list: []
  };
  store.list = parseListData(dataList);
  data = JSON.stringify(store);
  sessionStorage.setItem("todoStore", data);
};

export const returnTodoStore = () => {
  let data = sessionStorage.getItem("todoStore");
  let store = JSON.parse(data);
  return store;
};
