import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
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

  const [services, SetServices] = useState([]);
  /*
  flag used to call the api
  dirty = 1 -> call api
  dirty = 0 -> wait
  */
  const [dirty, setDirty] = useState(true);

  //call the server every 10 sec
  setTimeout(()=>setDirty(true), 10000);

  return (
    <BrowserRouter>
      <Container>
        <CustomNavbar/>
          <Routes>
            <Route path='/' element={ <Home services={services} setServices={SetServices} dirty={dirty} setDirty={setDirty}/> } />
            <Route path='/ticket/:ticketID' element={<Ticket dirty={dirty} setDirty={setDirty}/>} /> 
            {/*<Route index element={ <Home/> } />*/}
            {/*<Route path='/pages/:pageId' element={ <DetailLayout user={user} pages={pages} setPages={setPages}  blocks={blocks} setBlocks={setBlocks} setDirty={setDirty} />} />*/}
            <Route path='/*' element={<DefaultRoute />} />
          </Routes>
        </Container>
    </BrowserRouter>
  )
}

export default App
