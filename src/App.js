import React, { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import "./App.css"
import Todo from "./Todo.js"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { db } from "./firebase.js"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"
import GoogleIcon from "@mui/icons-material/Google"
const q = query(collection(db, "todos"), orderBy("timestamp", "desc"))

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
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
      <nav className="header">
        <h2>Cloud ToDo</h2>
      </nav>
      {profile ? (
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
