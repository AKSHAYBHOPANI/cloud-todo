import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { db } from "./firebase.js"
import { doc, deleteDoc } from "firebase/firestore"

const Todo = ({ arr }) => {
  return (
    <List className="todo__list">
      <ListItem>
        <CheckCircleOutlineIcon style={{ padding: "0px 10px", color: "#9fa8da" }} />
        <ListItemText primary={arr.item.todo} />
      </ListItem>
      <DeleteIcon
        fontSize="large"
        style={{ opacity: 0.9, color: "#9fa8da", padding: "0px 10px" }}
        onClick={() => {
          deleteDoc(doc(db, "todos", arr.id))
        }}
      />
    </List>
  )
}
export default Todo
