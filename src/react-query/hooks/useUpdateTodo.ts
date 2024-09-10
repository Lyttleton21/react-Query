import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService from "../services/todoService";

const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todoService.update,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
            console.log('Todo Updated successfully 🎉');
        }
    });
}

export default useUpdateTodo;