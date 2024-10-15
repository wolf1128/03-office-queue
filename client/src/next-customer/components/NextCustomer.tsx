import { Button, Container, Row, Col } from "react-bootstrap";
import { Service, Props } from "../../intefaces/types.ts";
import "../next-customer.css";
import { useDate } from "../hooks/clock.ts";
import { useEffect, useState } from "react";
import API from "../../API/API.ts";

export default function NextCustomer(props: Props) {
  // get serviceName from serviceID
  const myService = props.services.find(
    (service: Service) => service.ServiceID === props.ticket.serviceID
  );
  const { time } = useDate();

  const [officerId, setOfficerId] = useState(1);
  const [ticketNumber, setTicketNumber] = useState(props.ticket.ticketID);
  const [serviceName, setServiceName] = useState<string | undefined>(undefined);
  const [estimatedTime, setEstimatedTime] = useState(props.ticket.estimatedTime);

  const handleButton = async () => {
    const ticket = await API.nextCustomer(officerId);
    setEstimatedTime(ticket.estimatedTime);
    setTicketNumber(ticket.ticketID);
    setServiceName(
      props.services.find((service: Service) => service.ServiceID === ticket.serviceID)?.ServiceName
    );
  };

  useEffect(() => {
    setServiceName(myService?.ServiceName);
    console.log("Service Name: ", serviceName);
  }, [myService]);

  return (
    <Container className="counter-display text-center">
      <Row>
        <Col className="time-display">
          <p>
            Time: <span className="highlight">{time}</span>
          </p>
        </Col>
        <Col>
          <p className="counter-number">
            Your Counter No. <span className="highlight">{officerId}</span>
          </p>
        </Col>
      </Row>

      <div className="ticket-box">
        <h4>Next Ticket No</h4>
        <h1 className="ticket-number">{ticketNumber}</h1>
        <Row className="justify-content-center">
          <Col xs={6} className="service-type">
            <p>Service type</p>
            <h5 className="highlight">{serviceName}</h5>
          </Col>
          <Col xs={6} className="service-time">
            <p>Serving Time</p>
            <h5 className="highlight">{estimatedTime}</h5>
          </Col>
        </Row>
      </div>

      <Button variant="warning" size="lg" className="call-button" onClick={handleButton}>
        Call Next Customer
      </Button>
    </Container>
  );
}
