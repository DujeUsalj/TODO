import React, { useState, useEffect } from "react";
import classes from "./AddTask.module.css";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import db from "../../Firebase";
import firebase from "firebase";
function AddTask() {
  const [currentTask, setCurrentTask] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (currentTask !== "") {
      setCurrentTask("");
      db.collection("Tasks").add({
        message: currentTask,
        unCompleted: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <div className={classes.TextField1}>
      <form onSubmit={(event) => addTodo(event)}>
        <div className={classes.DisplayRow1}>
          <TextField
            value={currentTask}
            id="standard-basic"
            label="Add Task"
            onChange={(event) => {
              setCurrentTask(event.target.value);
            }}
          />
          <button onClick={(event) => addTodo(event)}>
            <AddIcon className={classes.AddIcon1} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
