import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css'
import Home from './get-ticket/components/home'
import Ticket from './get-ticket/components/ticket'
import CustomNavbar from './get-ticket/components/navbar';
import API from './API/API.ts';

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

  // get all the services
  useEffect(() => {
    API.getAllServices()
      .then(services => {
        setServices(services);
      });
  }, []);


  return (
    <BrowserRouter>
      <Container>
        <CustomNavbar/>
          <Routes>
            <Route path='/' element={ <Home ticket={ticket} setTicket={setTicket} services={services} setServices={setServices} /> } />
            <Route path='/ticket/:ticketID' element={<Ticket ticket={ticket} setTicket={setTicket} services={services} setServices={setServices}/>} /> 
            <Route path='/*' element={<DefaultRoute />} />
          </Routes>
        </Container>
    </BrowserRouter>
  )
}

export default App
