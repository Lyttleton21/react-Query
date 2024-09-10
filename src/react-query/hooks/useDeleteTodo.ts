import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";

export interface AddTodoContext {
    previousTodos: Todo[];
  }

const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todoService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
            console.log('Todo deleted successfully 🎉');
        }
    });

    // return {deleteTodo}
}

export default useDeleteTodo;