import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css'
import Home from './get-ticket/components/home'
import Ticket from './get-ticket/components/ticket'
import CustomNavbar from './get-ticket/components/navbar';

function DefaultRoute() {
  return(
    <Container className='App'>
      <h1>No data here...</h1>
      <h2>This is not the route you are looking for!</h2>
      <Link to='/'>Please go back to main page</Link>
    </Container>
  );
}

function App() {

  const [services, setServices] = useState([]);
  const [ticket, setTicket] = useState([]);
  /*
  flag used to call the api
  dirty = 1 -> call api
  dirty = 0 -> wait
  */
  const [dirty, setDirty] = useState(true);

  //call the server every 10 sec
  setTimeout(()=>setDirty(true), 15000);

  return (
    <BrowserRouter>
      <Container>
        <CustomNavbar/>
          <Routes>
            <Route path='/' element={ <Home ticket={ticket} setTicket={setTicket} services={services} setServices={setServices} dirty={dirty} setDirty={setDirty}/> } />
            <Route path='/ticket/:ticketID' element={<Ticket ticket={ticket} setTicket={setTicket} services={services} setServices={setServices}/>} /> 
            <Route path='/*' element={<DefaultRoute />} />
          </Routes>
        </Container>
    </BrowserRouter>
  )
}

export default App
