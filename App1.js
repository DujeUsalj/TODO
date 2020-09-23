import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./Firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import Messenger from "./messenger1.jpeg";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import classes from "./Form.module.css";
function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };
  console.log(input);
  console.log(messages);
  return (
    <div className="App">
      <img src={Messenger} />
      {/* <h1>Hello Clever Programmers </h1> */}
      <h1>Čao Kakao :)</h1>
      <h2>Welcome {username}</h2>
      <form>
        <FormControl className={classes.FormControl}>
          <Input
            className={classes.InputField}
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className={classes.IconButton}
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
