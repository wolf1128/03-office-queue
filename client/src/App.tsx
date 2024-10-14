import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './get-ticket/components/home'
import Ticket from './get-ticket/components/ticket'
import CustomNavbar from './shared-components/navbar.tsx';
import { Service, Ticket as TicketType } from './intefaces/types.ts';
import API from './API/API.ts';
import './App.css'
import DisplayBoard from './call-customer/components/board.tsx';

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

  const [services, setServices] = useState<Service[]>([]);
  const [ticket, setTicket] = useState<TicketType>({ ticketID: 1, serviceID: 1, issuedTime: "", estimatedTime: "", status: ""});

  // get all the services
  useEffect(() => {
    API.getAllServices()
      .then((services: Service[]) => {
        setServices(services);
      });
  }, []);

  
  return (
    <BrowserRouter>
      <Container>
        <CustomNavbar />
          <Routes>
            <Route path='/' element={ <Home services={services} ticket={ticket} setTicket={setTicket} /> } />
            <Route path='/ticket/:ticketID' element={<Ticket services={services} ticket={ticket} setTicket={setTicket} />} /> 
            <Route path='/displayboard' element={<DisplayBoard />} /> 
            <Route path='/*' element={<DefaultRoute />} />
          </Routes>
        </Container>
    </BrowserRouter>
  )
}

export default App
