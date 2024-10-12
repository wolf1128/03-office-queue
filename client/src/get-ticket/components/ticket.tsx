import { useState, useRef } from 'react'
import myIcon from '../../assets/Down_Arrow.svg';
import '../get-ticket.css';


function Ticket() {

    const [ticketNo, setTicketNo] = useState(110);
    const [waitingTime, setWaitingTime] = useState(0);
    const [serviceType, setServiceType] = useState("Service1");
    const [show, setShow] = useState(false);

    return (
        <>            
            {/* Ticket Details */}
            <div className='ticket-details'>
                <span>
                    Ticket Details
                </span>
            </div>

            {/* Ticket Number Box */}
            <div className='ticket-box'>
                <span className='ticket-text'>
                    Your Ticket Number
                </span>
                <br/>
                <span className='ticket-number'>
                    {ticketNo}
                </span>
                
            </div>
            
            {/* Information Box */}
            <div className='information-box'>
                <div className='waiting-time'>
                    Waiting Time
                    <div className='waiting-time-number'>{waitingTime}</div>
                </div>
                <div className='service-type'>
                    Service Type
                    <div className='service-type-number'>{serviceType}</div>
                </div>
            </div>

            {/* Get Your Receipt */}
            <div className='get-receipt'>
                <span className='get-receipt-text'>
                    Get your Receipt
                </span>
                <br/>    
                <img src={myIcon} alt="My Local Icon" width="60" height="60" />
            </div>
        </>
    )
}

export default Ticket