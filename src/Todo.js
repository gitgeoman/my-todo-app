import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import {
  Modal,
  Input,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import "./Todo.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  return (
    <>
      {/** okno modal */}
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div
          className={classes.paper}
          style={{
            marginTop: "30vh",
            marginLeft: "35vw",

            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <h2>Edit the todo</h2>

          <Input
            placeholder={props.data.todo}
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />

          <Button
            variant="contained"
            color="secondary"
            disabled={!input}
            onClick={(event) => {
              db.collection("todos")
                .doc(props.data.id)
                .set({ todo: input }, { merge: true });
              setOpen(false);
            }}
          >
            Update Todo
          </Button>
        </div>
      </Modal>

      <List style={{ width: "30%" }} className="todo__list">
        <ListItem>
          <ListItemText
            primary={props.data.todo}
            secondary={new Date(props.data.timestamp?.toDate()).toUTCString()}
          />

          <EditIcon onClick={(e) => setOpen(true)} />
          <ClearIcon
            onClick={(event) => {
              db.collection("todos").doc(props.data.id).delete();
            }}
          />
        </ListItem>{" "}
      </List>
    </>
  );
}

export default Todo;
