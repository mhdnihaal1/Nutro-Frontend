import {BrowserRouter } from 'react-router-dom'
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
