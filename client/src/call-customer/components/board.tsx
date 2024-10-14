import { useState, useRef } from 'react'
import '../call-customer.css';
import Clock from './clock.tsx';

function DisplayBoard() {

    const [ticketNo, setTicketNo] = useState(110);
    const [waitingTime, setWaitingTime] = useState(0);
    const [serviceType, setServiceType] = useState("Service1");
    const [show, setShow] = useState(false);

    return (
        <>
            <div className='full-page'>
                <div className='column'>    
                    <Clock />     
                    {/* Ticket Number Box */}
                    <div className='ticket-box'>
                        <span className='ticket-text'>
                            Ticket No
                        </span>
                        <br/>
                        <span className='ticket-number'>
                            {ticketNo}
                        </span>
                        <br/>
                        <span className='ticket-subtext'>
                            please proceed to
                        </span>
                        <br/>
                        <span className='ticket-counter'>
                            Counter 01
                        </span>                
                    </div>
                </div>
                <div className='column'>
                    {/* Waiting Queue Box */}
                    <div className='queue-title'>
                        <span className='queue-text'>
                            Waiting Queue
                        </span>
                    </div>
                    <div className='queue-box'>
                        <div className='service-queue'>
                            <span className='service-queue-lentgh'>5</span>
                            <span className='service-queue-text'>Service 01</span>
                        </div>
                        <div className='service-queue'>
                            <span className='service-queue-lentgh'>55</span>
                            <span className='service-queue-text'>Service 01</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayBoard