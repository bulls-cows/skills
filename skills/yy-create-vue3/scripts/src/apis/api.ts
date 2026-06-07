import { doRequest } from "@src/utils/requestUtils";

export const getExampleTodo = (): Promise<TReturn<ExampleTodo>> => {
  return doRequest<undefined, ExampleTodo>({
    method: "get",
    url: "/api/example/todo",
  });
};
