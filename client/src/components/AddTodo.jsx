import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";

function AddTodo() {
  const [todo, setTodo] = useState("");

  const addNewTodo = (e) => {
    e.preventDefault();
    alert(`TODO:\n${todo}`);
  };

  return (
    <div className="addTodo">
      <form onSubmit={addNewTodo}>
        <TextField
          label="Add new todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <IconButton type="submit">
          <SendRoundedIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default AddTodo;
