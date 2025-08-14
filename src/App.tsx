import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import sunIcon from "./assets/icon-sun.svg";
import moonIcon from "./assets/icon-moon.svg";
import Todo from "./components/Todo";
import TodoInput from "./components/TodoInput";
import TodoFooter from "./components/TodoFooter";
type TodoListType = { id: string; todo: string; isCompleted: boolean }[];
type ShowListType = "active" | "completed" | "all";

export default function App() {
  const [todoList, setTodoList] = useState<TodoListType>(() => {
    const todoList = localStorage.getItem("TODO");
    return todoList ? JSON.parse(todoList) : [];
  });
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");
  const [showList, setShowList] = useState<ShowListType>("all");
  const activeList = todoList.filter((todo) => !todo.isCompleted);
  const completedList = todoList.filter((todo) => todo.isCompleted);
  useEffect(() => {
    localStorage.setItem("TODO", JSON.stringify(todoList));
  }, [todoList]);

  let itemsLeft = todoList.length;
  if (showList === "active") {
    itemsLeft = activeList.length;
  }
  if (showList === "completed") {
    itemsLeft = completedList.length;
  }
  const handleThemeMode = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  const handleNewTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentTodo = event.currentTarget.value;
    if (currentTodo.length === 0) {
      return;
    }

    if (event.key === "Enter") {
      setTodoList((prev) => {
        return [
          ...prev,
          { id: uuidv4(), todo: currentTodo, isCompleted: false },
        ];
      });
    }
  };
  const removeFromTodo = (id: string) => {
    setTodoList((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };
  const handleSelect = (id: string) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });
    });
  };
  const handleAllSelected = () => {
    setShowList("all");
  };
  const handleActiveSelected = () => {
    setShowList("active");
  };
  const handleCompletedSelected = () => {
    setShowList("completed");
  };
  const handleRemoveCompleted = () => {
    setTodoList((prev) => {
      return prev.filter((todo) => !todo.isCompleted);
    });
  };

  const renderAllTodos = (type: ShowListType) => {
    const typeMap = {
      active: activeList,
      completed: completedList,
      all: todoList,
    };

    return typeMap[type].map((item) => (
      <Todo
        key={item.id}
        id={item.id}
        text={item.todo}
        deleteTodo={removeFromTodo}
        isCompleted={item.isCompleted}
        handleSelect={handleSelect}
      />
    ));
  };

  return (
    <main
      className={`todo-background min-h-screen px-7 ${
        themeMode === "light" ? "" : "theme-dark"
      }`}
    >
      <div className="max-w-128 mx-auto py-16 md:py-25 font-josefin text-[18px]">
        <div className="flex items-center justify-between pb-10">
          <h1 className="text-white text-3xl font-bold tracking-[1rem] leading-none">
            TODO
          </h1>
          <button
            onClick={handleThemeMode}
            aria-label="Toggle theme"
            className="cursor-pointer"
          >
            <motion.img
              key={themeMode === "light" ? moonIcon : sunIcon}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={themeMode === "light" ? moonIcon : sunIcon}
              alt=""
            />
          </button>
        </div>
        <TodoInput handleNewTodo={handleNewTodo} />
        <AnimatePresence>
          {todoList.length > 0 && (
            <motion.div key="todo-list" exit={{ opacity: 0 }}>
              <>
                <div className="mt-5 shadow-[0_0_2px_gray] rounded-t-md overflow-hidden ">
                  <ul>
                    <AnimatePresence>
                      {renderAllTodos(showList)}
                    </AnimatePresence>
                  </ul>
                </div>
                <motion.div animate={{ opacity: 1 }}>
                  <TodoFooter
                    itemsLeft={itemsLeft}
                    showList={showList}
                    handleAllSelected={handleAllSelected}
                    handleActiveSelected={handleActiveSelected}
                    handleCompletedSelected={handleCompletedSelected}
                    handleRemoveCompleted={handleRemoveCompleted}
                  />
                </motion.div>
              </>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
