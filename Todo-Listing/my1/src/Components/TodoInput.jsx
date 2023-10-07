import { useState } from "react";
import "./TodoInput.css";

export const TodoInput = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const newobj = {
      title: input,
      status: false,
    };
    addTodo(newobj);
  };

  return (
    <>
      <div className={`todo-input-container`}>
        <input
          data-testid="todo-input"
          className={`todo-input`}
          type="text"
          placeholder="Add Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="todo-input" 
        />
        <button
          data-testid="add-button"
          className={`add-button`}
          onClick={handleAdd}
          id="add-button" 
        >
          Add
        </button>
      </div>
    </>
  );
};
