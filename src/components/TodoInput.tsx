interface TodoInputProps {
  handleNewTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TodoInput({ handleNewTodo }: TodoInputProps) {
  return (
    <label htmlFor="todo" className="relative">
      <input
        id="todo"
        name="todo"
        className=" pl-15 p-4 w-full text-[var(--text-color-primary)] bg-[var(--todo-background)] rounded-md"
        onKeyDown={(event) => handleNewTodo(event)}
        type="text"
        placeholder="Enter your todo..."
      />
      <span className="absolute size-5 rounded-full left-6 top-1/2 -translate-y-1/2 border-1 border-navy-dark-850"></span>
    </label>
  );
}
