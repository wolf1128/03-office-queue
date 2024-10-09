import { useState } from 'react'
import './App.css'
import Home from './pages/home'
import Ticket from './pages/ticket'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Ticket/>
    {/* <Home/> */}
      
    </>
  )
}

export default App
