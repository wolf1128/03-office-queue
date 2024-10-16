import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import API from "./API/API.ts";
import Home from "./get-ticket/components/Home.tsx";
import Ticket from "./get-ticket/components/Ticket.tsx";
import CustomNavbar from "./shared-components/Navbar.tsx";
import { Service, Ticket as TicketType } from "./interfaces/types.ts";
import NextCustomer from "./next-customer/components/NextCustomer.tsx";
import DisplayBoard from "./call-customer/components/Board.tsx";

function DefaultRoute() {
  return (
    <Container className="App">
      <h1>No data here...</h1>
      <h2>This is not the route you are looking for!</h2>
      <Link to="/">Please go back to main page</Link>
    </Container>
  );
}

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [ticket, setTicket] = useState<TicketType>({
    ticketID: 1,
    serviceID: 1,
    issuedTime: "",
    estimatedTime: 0,
    status: "",
    counterID: 0
  });

  // get all the services
  useEffect(() => {
    API.getAllServices().then((services: Service[]) => {
      setServices(services);
    });
  }, []);

  return (
    <Container>
      <CustomNavbar />
      <Routes>
        <Route
          path="/"
          element={<Home services={services} ticket={ticket} setTicket={setTicket} />}
        />
        <Route
          path="/ticket/:ticketID"
          element={<Ticket services={services} ticket={ticket} setTicket={setTicket} />}
        />
        <Route path="/*" element={<DefaultRoute />} />
        <Route
          path="/next-customer"
          element={<NextCustomer services={services} ticket={ticket} setTicket={setTicket} />}
        />
        <Route
          path="/displayboard"
          element={<DisplayBoard services={services} ticket={ticket} setTicket={setTicket} />}
        />
      </Routes>
    </Container>
  );
}

export default App;
