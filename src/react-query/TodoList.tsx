import useDeleteTodo from "./hooks/useDeleteTodo";
import useTodos from "./hooks/useTodos";
import useUpdateTodo from "./hooks/useUpdateTodo";
import { Todo } from "./services/todoService";

const TodoList = () => {
  const { data: todos, error, isLoading } = useTodos();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const handleDelete = (id: number) => deleteTodo.mutate(id);
  const handleUpdate = (todo: Todo) => {
    console.log(todo);
    updateTodo.mutate(todo);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li
          key={todo.id}
          className="list-group-item d-flex justify-content-between"
        >
          {todo.title}
          <div>
            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                handleUpdate({
                  ...todo,
                  id: todo.id,
                  title: todo.title + "!!!",
                })
              }
            >
              Update
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
