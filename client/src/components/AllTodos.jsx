import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import "../assets/css/AllTodos.css";

function AllTodos() {
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/all`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="allTodos">
      {todos?.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default AllTodos;
