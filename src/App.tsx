import { FaPen, FaClipboardList } from "react-icons/fa";
import TodoList from "./components/TodoList";
import "./CSS/App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="logoSide">
          <FaPen className="bounce" />
          <h1>What To Do</h1>
          <FaClipboardList className="bounce" />
        </div>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
