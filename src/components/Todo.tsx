import { motion } from "motion/react";
import checkedIcon from "../assets/icon-check.svg";
import deleteIcon from "../assets/icon-cross.svg";
type TodoProps = {
  text: string;
  id: string;
  isCompleted: boolean;
  deleteTodo: (id: string) => void;
  handleSelect: (id: string) => void;
};

export default function Todo({
  text,
  id,
  deleteTodo,
  isCompleted,
  handleSelect,
}: TodoProps) {
  return (
    <motion.li
      initial={{ opacity: 0, transform: "translateX(-100px)" }}
      animate={{ opacity: 1, transform: "translateX(0)" }}
      exit={{ opacity: 0, transform: "translateX(100px)" }}
    >
      <label
        className={`group relative pl-15 p-4 flex justify-between  cursor-pointer border-b-1 border-[var(--todo-border)] bg-[var(--todo-background)] hover:text-[var(--text-color-hover)] transition gap-4 ${
          isCompleted
            ? "text-gray-dark-600/50 line-through"
            : "text-[var(--text-color-primary)]"
        }`}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => handleSelect(id)}
          className="hidden"
        />
        <motion.span
          key={isCompleted ? "checked-icon" : "unchecked-icon"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="group-has-[input:checked]:bg-[image:var(--checkbtn-gradient)] absolute size-5 rounded-full left-6 top-1/2 -translate-y-1/2 bg-[var(--todo-border)] flex justify-center items-center hover:bg-[image:var(--checkbtn-gradient)]"
        >
          <img
            src={checkedIcon}
            alt=""
            className="hidden group-has-[input:checked]:block"
          />
          <div className="bg-[var(--todo-background)] size-[18px] rounded-full group-has-[input:checked]:hidden"></div>
        </motion.span>
        <span className="flex-1 min-w-0 break-words">{text}</span>
        <button
          aria-label="Delete Todo."
          className="cursor-pointer shrink-0"
          onClick={() => deleteTodo(id)}
        >
          <img src={deleteIcon} alt="" />
        </button>
      </label>
    </motion.li>
  );
}
