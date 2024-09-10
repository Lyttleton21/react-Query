import { useRef } from "react";
import useCreateTodo from "./hooks/useCreateTodo";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const createTodo = useCreateTodo(() => {
    if (ref.current) ref.current.value = "";
  });

  return (
    <>
      {createTodo.error && (
        <div className="alert alert-danger">{createTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value) {
            createTodo.mutate({
              id: 0,
              title: ref.current.value,
              completed: false,
              userId: 1,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
