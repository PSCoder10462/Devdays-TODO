import "./assets/css/App.css";
import AddTodo from "./components/AddTodo";
import AllTodos from "./components/AllTodos";

function App() {
  return (
    <div className="App">
      <h1>Todo list</h1>
      <AddTodo />
      <AllTodos />
    </div>
  );
}

export default App;
