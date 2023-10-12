// MIT License

// Copyright (c) 2023 Akshay Bhopani

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished.

// https://mit-license.org/

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
