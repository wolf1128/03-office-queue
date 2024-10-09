import { Button, Container, Row, Col } from "react-bootstrap";
import "../next-customer.css";

export default function NextCustomer() {
  return (
    <Container className="counter-display text-center">
      <Row className="justify-content-end">
        <Col xs={6} className="text-end time-display">
          <p>
            Time: <span className="highlight">15:00</span>
          </p>
        </Col>
        <Col xs={6} className="text-end">
          <p>Your Counter No. 2</p>
        </Col>
      </Row>

      <div className="ticket-box">
        <h4>Next Ticket No</h4>
        <h1 className="ticket-number">102</h1>
        <Row className="justify-content-center">
          <Col xs={6} className="service-type">
            <p>Service type</p>
            <h5 className="highlight">Poste</h5>
          </Col>
          <Col xs={6} className="service-time">
            <p>Serving Time</p>
            <h5 className="highlight">5 mins</h5>
          </Col>
        </Row>
      </div>

      <Button variant="warning" size="lg" className="call-button">
        Call Next Customer
      </Button>
    </Container>
  );
}
