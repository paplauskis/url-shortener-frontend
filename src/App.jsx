import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import Url from './pages/Url.jsx'
import Main from './pages/Main.jsx'
import Redirect from './components/Redirect.jsx'
import LoginRegister from './pages/LoginRegister.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" Component={Main} />
      <Route path="/:shortUrl" Component={Redirect} />
      <Route path="/url/:id" Component={Url} />
      <Route path="/user/:mode" Component={LoginRegister} />
    </Routes>
  )
}

export default App
