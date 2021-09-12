import React, { useState } from "react";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import "../assets/css/AddTodo.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    background: "transparent",
    boxShadow: "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function AddTodo() {
  const [todo, setTodo] = useState("");
  const classes = useStyles();
  const addNewTodo = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
      }),
    }).then((resp) => {
      setTodo("");
    });
  };

  return (
    <div className="addTodo">
      <Paper component="form" className={classes.root} onSubmit={addNewTodo}>
        <InputBase
          className={classes.input}
          placeholder="Add Todo"
          inputProps={{ "aria-label": "Add Todo" }}
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          required
        />
        <IconButton type="submit">
          <SendRoundedIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default AddTodo;
