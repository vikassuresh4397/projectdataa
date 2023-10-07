import { useEffect, useState } from "react";
import { TodoInput } from "./TodoInput";
import axios from "axios";
import "./Todo.css";

const url = `https://projectdataa.onrender.com/todos`;

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    axios
      .get(url)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleAdd = (payload) => {
    axios
      .post(url, payload)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        getTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleToggleStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });

    axios
      .put(`${url}/${id}`, { status: !todos.find((todo) => todo.id === id).status })
      .then(() => setTodos(updatedTodos))
      .catch((err) => console.log(err));
  };

  const handleEdit = (id, newTitle) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });

    axios
      .put(`${url}/${id}`, { title: newTitle })
      .then(() => setTodos(updatedTodos))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => getTodos())
      .catch((err) => console.log(err));
  };

  return (
    <div className="todos-container">
   
      <TodoInput addTodo={handleAdd} />
  
      <div data-testid="todos-wrapper">
        {todos.length > 0 &&
          todos.map((todo) => (
            <div key={todo.id} className="todo-item" id={`todo-${todo.id}`}>
              <p className="todo-title" id={`todo-title-${todo.id}`}>{todo.title}</p>
              <p className="todo-status" id={`todo-status-${todo.id}`}>
                {todo.status ? (
                  <button className="completed" onClick={() => handleToggleStatus(todo.id)}>Completed</button>
                ) : (
                  <button className="incomplete" onClick={() => handleToggleStatus(todo.id)}>Incomplete</button>
                )}
              </p>
              <button className="todo-edit-btn" id={`todo-edit-${todo.id}`} onClick={() => handleEdit(todo.id, prompt("Enter new title:", todo.title))}>Edit</button>
              <button className="todo-delete-btn" id={`todo-delete-${todo.id}`} onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};


export default Todos;