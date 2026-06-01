import { doRequest } from "@src/scripts/requestUtils";

export const getExampleTodo = (): Promise<TReturn<ExampleTodo>> => {
  return doRequest<undefined, ExampleTodo>({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todos/1",
  });
};
