import React from "react";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import IconButton from "@material-ui/core/IconButton";
import "../assets/css/Todo.css";

function Todo({ todo, deleteTodoFromState, toggleTaskCompletionInState }) {
  const { _id, task, completed } = todo;

  const toggleTaskCompletion = () => {
    fetch(`${process.env.REACT_APP_SERVER}/${_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        new_todo: {
          _id,
          task,
          completed: !completed,
        },
      }),
    }).then((resp) => resp.ok && toggleTaskCompletionInState(_id));
  };

  const deleteTodo = () => {
    fetch(`${process.env.REACT_APP_SERVER}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: _id,
      }),
    }).then((resp) => resp.ok && deleteTodoFromState(_id));
  };

  return (
    <div className="todo">
      <p className={`${completed && "strike"}`}>{task}</p>
      <div className="todo_options">
        <IconButton onClick={toggleTaskCompletion}>
          <CheckRoundedIcon />
        </IconButton>
        <IconButton onClick={deleteTodo}>
          <DeleteForeverRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Todo;
