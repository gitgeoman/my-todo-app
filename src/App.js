import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when the app loads I listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this will fire up when the app loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            timestamp: doc.data().timestamp,
          }))
        );
        /*
        console.log(
          "dane to",
          snapshot.docs.map((doc) =>
            new Date(doc.data().timestamp.toDate()).toUTCString()
          )
        );*/
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //setTodos([...todos, input]); //without db
    setInput("");
  };

  return (
    <div className="App">
      <h1>The Todo App </h1>

      <FormControl>
        <InputLabel>write a todo</InputLabel>
        <Input
          placeholder="Write a new Todo"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <FormHelperText>
          and hit the enter - it will be add to the list
        </FormHelperText>
        <Button
          disabled={!input}
          type="Submit"
          onClick={addTodo}
          type="Submit"
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </FormControl>

      <ul>
        {todos.map((todo) => (
          <Todo className="todo" data={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
