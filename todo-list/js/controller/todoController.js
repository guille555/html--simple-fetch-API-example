import * as service from "../service/todoService.js";

export const addTodo = async (todo) => {
  await service.addTodo(todo);
};

export const returnListTodos = async () => {
  let list = await service.returnListTodos();
  return list;
};
