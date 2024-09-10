import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";

export interface AddTodoContext {
    previousTodos: Todo[];
  }

const useCreateTodo = (onAdd: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Todo, Error, Todo, AddTodoContext>({
      mutationFn: todoService.create,

      onMutate: (newTodo) => {
        const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
        queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
          newTodo,
          ...(todos || []),
        ]);
         onAdd();
        return { previousTodos };
      },

      onSuccess: (savedTodos, newTodo) => {
        queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
          todos?.map((todo) => (todo === newTodo ? savedTodos : todo))
        );
      },
      
      onError: (error, newTodo, context) => {
        if (!context) return;
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
      },
    });
}

export default useCreateTodo;