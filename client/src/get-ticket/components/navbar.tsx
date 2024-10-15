import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import "../get-ticket.css";

function CustomNavbar() {
  const renderTooltip = (props: any) => (
    <Tooltip className="info-text" id="button-tooltip" {...props}>
      Hey! Select any service from
      <br />
      below that you want to avail
      <br />
      to get a ticket. If you need <br />
      further help, call the staff.
    </Tooltip>
  );

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/"); // Navigate to the Home page
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Container fluid className="navbar-container">
        {/* Left: Back Button */}
        <Button className="btn btn-outline" onClick={goToHome}>
          Home
        </Button>

        {/* Center: Brand */}
        <Navbar.Brand className="post-office">
          <MdOutlineLocalPostOffice size={60} className="post-office-icon" />
          <p className="post-office-title">Italian Post Office</p>
        </Navbar.Brand>

        {/* Right: Info Icon */}
        <OverlayTrigger
          placement="bottom-start"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button className="info-btn">
            <IoIosInformationCircleOutline size={28} />
          </Button>
        </OverlayTrigger>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
