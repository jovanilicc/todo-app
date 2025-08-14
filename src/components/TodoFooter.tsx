type TodoFooterProps = {
  itemsLeft: number;
  showList: "active" | "completed" | "all";
  handleAllSelected: () => void;
  handleActiveSelected: () => void;
  handleCompletedSelected: () => void;
  handleRemoveCompleted: () => void;
};

export default function TodoFooter({
  itemsLeft,
  showList,
  handleAllSelected,
  handleActiveSelected,
  handleCompletedSelected,
  handleRemoveCompleted,
}: TodoFooterProps) {
  return (
    <>
      <div className="bg-[var(--todo-background)] px-5 shadow-[0_0_2px_gray] rounded-b-md overflow-hidden py-5 md:py-3 flex justify-between text-xs transition  [&_button]:cursor-pointer text-gray-dark-600 font-bold items-center">
        <p className="">{itemsLeft} Items left</p>
        <div className="hidden md:flex justify-between basis-1/3">
          <button
            onClick={handleAllSelected}
            className={
              showList === "all"
                ? "text-primary-blue"
                : "hover:hover:text-[var(--text-color-hover)]"
            }
          >
            All
          </button>
          <button
            onClick={handleActiveSelected}
            className={
              showList === "active"
                ? "text-primary-blue"
                : "hover:hover:text-[var(--text-color-hover)]"
            }
          >
            Active
          </button>
          <button
            onClick={handleCompletedSelected}
            className={
              showList === "completed"
                ? "text-primary-blue"
                : "hover:hover:text-[var(--text-color-hover)]"
            }
          >
            Completed
          </button>
        </div>
        <button
          onClick={handleRemoveCompleted}
          className="hover:hover:text-[var(--text-color-hover)]"
        >
          Clear Completed
        </button>
      </div>
      <div className="md:hidden bg-[var(--todo-background)] shadow-[0_0_2px_gray] rounded-md px-5 py-4 mt-5 flex justify-center gap-10 text-base transition  [&_button]:cursor-pointer text-gray-dark-600 font-bold items-center">
        <button
          onClick={handleAllSelected}
          className={
            showList === "all"
              ? "text-primary-blue"
              : "hover:hover:text-[var(--text-color-hover)]"
          }
        >
          All
        </button>
        <button
          onClick={handleActiveSelected}
          className={
            showList === "active"
              ? "text-primary-blue"
              : "hover:hover:text-[var(--text-color-hover)]"
          }
        >
          Active
        </button>
        <button
          onClick={handleCompletedSelected}
          className={
            showList === "completed"
              ? "text-primary-blue"
              : "hover:hover:text-[var(--text-color-hover)]"
          }
        >
          Completed
        </button>
      </div>
    </>
  );
}
