import { InputLabel, FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "../../Firebase";
import classes from "./SelectedTypeOfTask.module.css";
function SelectedTypeOfTask() {
  const [allTasks, setAllTasks] = useState("");
  const handleChange = (event) => {
    setAllTasks(event.target.value);

    db.collection("Tasks").doc("SelectedTask").set({
      task: event.target.value,
    });
  };
  useEffect(() => {
    db.collection("Tasks").doc("SelectedTask").set({
      task: "AllTasks",
    });
  }, []);
  return (
    <div className={classes.FormControl1}>
      <FormControl className={classes.FormControl1}>
        <InputLabel id="demo-simple-select-label">All Tasks</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={allTasks}
          onChange={handleChange}
        >
          <MenuItem value={"AllTasks"}>All Tasks</MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
          <MenuItem value={"UnCompleted"}>UnCompleted</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectedTypeOfTask;
