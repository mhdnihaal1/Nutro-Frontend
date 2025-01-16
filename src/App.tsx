import {BrowserRouter } from 'react-router-dom'
// import React from 'react'
import './App.css'
import AllRouter from './routes/AllRoutes';

function App() {


  return (
    <>
    <BrowserRouter>
      <AllRouter/>
    </BrowserRouter>
      
    </>
  )
}

export default App
