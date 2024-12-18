import React from "react";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
