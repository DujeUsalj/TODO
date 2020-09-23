import React, { useState } from "react";
import classes from "./App.module.css";
import AddTask from "./Components/AddTask/AddTask";
import SelectedTypeOfTask from "./Components/SelectedTypeOfTask/SelectedTypeOfTask";
import Todo from "./Components/Todo/Todo";
function App() {
  return (
    <div className={classes.App}>
      <div className={classes.DisplayRow}>
        <AddTask />
        <SelectedTypeOfTask />
      </div>
      <Todo />
    </div>
  );
}

export default App;
