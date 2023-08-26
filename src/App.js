import React, { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import "./App.css"
import Todo from "./Todo.js"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { db } from "./firebase.js"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"
const q = query(collection(db, "todos"), orderBy("timestamp", "desc"))

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const addTodo = (e) => {
    e.preventDefault()
    addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: serverTimestamp(),
    })
    setInput("")
  }
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  })

  useEffect(() => {
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
    onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      )
    })
  }, [input])

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout()
    setProfile(null)
  }
  return (
    <div className="App">
      <h2> TODO List App</h2>

      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      <form onSubmit={addTodo}>
        <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((item) => (
          <Todo key={item.id} arr={item} />
        ))}
      </ul>
    </div>
  )
}

export default App
