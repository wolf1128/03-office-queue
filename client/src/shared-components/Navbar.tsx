import { Navbar, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import "./navbar.css";


function CustomNavbar() {

  const renderTooltip = (props: any) => (
      <Tooltip className="custom-info-text" id="button-tooltip" {...props}>
        Hey! Select any service from<br/>
        below that you want to avail<br/>
        to get a ticket. If you need <br/>
        further help, call the staff.
      </Tooltip>
    );

  const location = useLocation();
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  const goToDisplayBoard = () => {
    navigate("/displayboard");
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container fluid className="custom-navbar-container">
        {/* Left: Back Button */}
        <div className="custom-navbar-buttons">
          {location.pathname === "/" ? (
            <Button className="custom-btn-outline" onClick={goToDisplayBoard}>
              Display Board
            </Button>
          ) : (
            <Button className="custom-btn-outline" onClick={goToHome}>
              Home
            </Button>
          )}
        </div>

        {/* Center: Brand */}
        <Navbar.Brand className="custom-post-office">
            <MdOutlineLocalPostOffice size={60} className="custom-post-office-icon"/>
            <p className="custom-post-office-title">Italian Post Office</p>
        </Navbar.Brand>

        {/* Right: Info Icon */}
        <div className="custom-navbar-info">
          <OverlayTrigger
            placement="bottom-start"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button className="custom-info-btn">
              <IoIosInformationCircleOutline size={28} />
            </Button>
          </OverlayTrigger>
        </div>
      </Container>
    </Navbar>
  )


}

export default CustomNavbar;

