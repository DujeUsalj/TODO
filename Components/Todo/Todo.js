import React, { useEffect, useState } from "react";
import classes from "./Todo.module.css";
import DoneIcon from "@material-ui/icons/Done";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "../../Firebase";
import FlipMove from "react-flip-move";
function Todo() {
  const [todos, setTodos] = useState();
  const [typeOfTaskss, setTypeOfTaskss] = useState();
  useEffect(() => {
    db.collection("Tasks")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);
  const todoDeleted = (event, id) => {
    console.log("completed id", id);
    db.collection("Tasks").doc(id).delete();
  };
  const todoCompleted = (event, id) => {
    console.log("completed id", id);
    db.collection("Tasks").doc(id).update({
      unCompleted: false,
    });
  };
  useEffect(() => {
    db.collection("Tasks")
      .doc("SelectedTask")
      .onSnapshot((snapshot) => {
        setTypeOfTaskss({ id: snapshot.id, data: snapshot.data() });
      });
    console.log("Evo mene");
  }, [db.collection("Tasks").doc("SelectedTask").task]);
  const Todos = (props, keyId) => (
    <div className={classes.Rectangle}>
      <input
        key={keyId}
        className={`${!props.data.unCompleted ? classes.InputCompleted : null}`}
        value={props.data.message}
      ></input>
      <button>
        <DoneIcon
          className={classes.Icon}
          onClick={(event) => todoCompleted(event, props.id)}
        />
      </button>
      <button>
        <DeleteForeverIcon
          className={classes.Delete}
          onClick={(event) => todoDeleted(event, props.id)}
        />
      </button>
    </div>
  );

  return (
    <div className={classes.DisplayColumn}>
      <FlipMove className={classes.Rectangle2}>
        {todos?.map((todo, id) => {
          switch (typeOfTaskss.data.task) {
            case "Completed":
              if (!todo.data.unCompleted) {
                return Todos(todo, id);
              }
              break;
            case "UnCompleted":
              if (todo.data.unCompleted) {
                return Todos(todo, id);
              }
              break;
            default:
              return Todos(todo, id);

            //   return (
            //     <div className={classes.Rectangle}>
            //       <input
            //         className={`${
            //           !todo.data.unCompleted ? classes.InputCompleted : null
            //         }`}
            //         value={todo.data.message}
            //       ></input>
            //       <button>
            //         <DoneIcon
            //           className={classes.Icon}
            //           onClick={(event) => todoCompleted(event, todo.id)}
            //         />
            //       </button>
            //       <button>
            //         <DeleteForeverIcon
            //           className={classes.Delete}
            //           onClick={(event) => todoDeleted(event, todo.id)}
            //         />
            //       </button>
            //     </div>
            //   );
          }
        })}
      </FlipMove>
    </div>
  );
}

export default Todo;
