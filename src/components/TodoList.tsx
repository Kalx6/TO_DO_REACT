import { useState } from "react";
import TodoTypes from "../todo";
import TodoService from "../TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );

      setEditedTodoId(null);
      setEditedTodoText("");
    }
  };

  const handleDlete = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todoContainer">
        {todos.map((t) => (
          <div className="items" key={t.id}>
            {editingTodoId == t.id ? (
              <div className="editText">
                <input
                  className="listInput"
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />
                <div className="btnContainer">
                  <button className="markBtn" onClick={() => handleSave(t.id)}>
                    <FaCheck />
                  </button>
                  <button className="deleteBtn" onClick={() => handleCancel()}>
                    <GiCancel />
                  </button>
                </div>
              </div>
            ) : (
              <div className="taskList">
                <span>{t.text}</span>
                <div className="btnContainer">
                  <button
                    className="editBtn"
                    onClick={() => handleEditStart(t.id, t.text)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDlete(t.id)}
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
