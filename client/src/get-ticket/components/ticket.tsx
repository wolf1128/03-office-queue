import { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import myIcon from '../../assets/Down_Arrow.svg';
import Overlay from 'react-bootstrap/Overlay';


function Ticket() {

    const [ticketNo, setTicketNo] = useState(0);
    const [waitingTime, setWaitingTime] = useState(0);
    const [serviceType, setServiceType] = useState("");
    const [show, setShow] = useState(false);

    const target = useRef(null);


    return (
        <>
            <div style={{ border: '2px solid black', padding: '10px', borderRadius: '10px', width: '100px' }}>
                Back
            </div>

            <Button ref={target} onClick={() => setShow(!show)}>
                <IoIosInformationCircleOutline size={28} />
            </Button>
            <Overlay target={target.current} show={show} placement="bottom">
                {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        Hey! Select any service from below your want to avail to get a ticket. If you need further help call the staff
                    </div>
                )}
            </Overlay>
            <div>
                <MdOutlineLocalPostOffice size={28} />
            </div>
            <h2>
                Italian Post Office
            </h2>
            <h1>
                Ticket Details
            </h1>
            <div style={{ border: '2px solid black', padding: '70px', borderRadius: '10px' }}>
                <h3>Your Ticket Number</h3>
                {ticketNo}
            </div>

            <div>
                <div>
                    <h3>Waiting Time</h3>
                    <h4>{waitingTime}</h4>
                </div>
                <div>
                    <h3>Service Type</h3>
                    <h4>{serviceType}</h4>
                </div>
            </div>

            <div>
                <h2>Get your Recipt</h2>
                <img src={myIcon} alt="My Local Icon" width="50" height="50" />


            </div>


        </>
    )
}

export default Ticket