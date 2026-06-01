type TReturn<T, K = undefined> = [null, T] | [Error, K];

interface ExampleTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
