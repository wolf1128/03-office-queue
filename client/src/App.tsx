import { useState } from 'react'
import './App.css'
import Home from './get-ticket/components/home'
import Ticket from './get-ticket/components/ticket'

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
