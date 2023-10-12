// MIT License

// Copyright (c) 2023 Akshay Bhopani

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished.

// https://mit-license.org/

import React, { useState, useEffect } from "react"
import { TextField } from "@mui/material"
import "./App.css"
import Todo from "./Todo.js"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { db } from "./firebase.js"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"
import GoogleIcon from "@mui/icons-material/Google"
const q = query(collection(db, "todos"), orderBy("timestamp", "desc"))

function App() {
  //Local Data Variables
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  //Pushing ToDo's to Firestore
  const addTodo = (e) => {
    e.preventDefault()
    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
      name: profile.name,
      email: profile.email,
    })
    setInput("")
  }

  //OAuth Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  })

  useEffect(() => {
    //if User Authenticated then fetch user details
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setProfile(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  useEffect(() => {
    //Fetch Latest ToDo's to show up on UI.
    onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      )
    })
  }, [input])

  // Log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout()
    setProfile([])
  }
  return (
    <div className="App">
      <nav className="header">
        <h2>Cloud ToDo</h2>
      </nav>
      {profile.picture ? (
        <div>
          <div className="profile">
            <img src={profile.picture} alt="user image" />
            <h3>Welcome, {profile.name}</h3>
            <p>{profile.email}</p>
            <br />
          </div>

          <form onSubmit={addTodo} style={{ textAlign: "center", padding: "10px" }}>
            <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{ margin: "0px 5px", textAlign: "center" }} size="small" value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="button" onClick={addTodo}>
              Add Todo
            </button>
            <button onClick={logOut}>Log out</button>
          </form>
          <ul>
            {todos.map((item) => (
              <Todo key={item.id} arr={item} />
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ position: "absolute", top: "50%" }}>
          <button onClick={() => login()}>
            Sign in <GoogleIcon style={{ height: "15px" }} />
          </button>
        </div>
      )}
      <footer>
        <img src={"./logo.png"} alt={"code vipassna"}></img>
      </footer>
    </div>
  )
}

export default App
