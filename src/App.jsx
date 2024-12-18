import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import Url from './pages/Url.jsx'
import Main from './pages/Main.jsx'
import Redirect from './components/Redirect.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" Component={Main} />
      <Route path="/:shortUrl" Component={Redirect} />
      <Route path="/url/:id" Component={Url} />
    </Routes>
  )
}

export default App
