import React from "react";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import IconButton from "@material-ui/core/IconButton";
import "../assets/css/Todo.css";

function Todo({ todo }) {
  const { _id, task, completed } = todo;
  // console.log(`_id: ${_id}\ntask: ${task}\ncompleted: ${completed}`);

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
    }).then((resp) => console.log(resp));
  };

  const deleteTodo = () => {
    fetch(`${process.env.REACT_APP_SERVER}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: _id,
      }),
    }).then((resp) => console.log(resp));
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
