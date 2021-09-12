import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import "../assets/css/AllTodos.css";
import Pusher from "pusher-js";

function AllTodos() {
  const [todos, setTodos] = useState(null);

  const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  });

  const channel = pusher.subscribe("todo-list");

  useEffect(() => {
    channel.bind("inserted", ({ todoDetails }) => {
      setTodos([...todos, todoDetails]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channel, todos]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/all`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteTodoFromState = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleTaskCompletionInState = (id) => {
    let newTodos = [...todos];
    for (let i = 0; i < newTodos.length; ++i) {
      if (newTodos[i]._id === id)
        newTodos[i].completed = !newTodos[i].completed;
    }
    setTodos(newTodos);
  };

  return (
    <div className="allTodos">
      {todos?.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          deleteTodoFromState={deleteTodoFromState}
          toggleTaskCompletionInState={toggleTaskCompletionInState}
        />
      ))}
    </div>
  );
}

export default AllTodos;
