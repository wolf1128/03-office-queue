import { useState } from 'react'
import '../call-customer.css';
import Clock from './clock.tsx';
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TbHourglassEmpty } from "react-icons/tb";

function DisplayBoard() {

    const [ticketNo, setTicketNo] = useState(110);
    const queue1: number = 0;
    const queue2: number = 1;
    const queue3: number = 5;


    return (
        <>
            <div className='full-page'>
                <div className='column'>    
                    <Clock />     
                    {/* Ticket Number Box */}
                    <div className='ticket-box-orange'>
                        <span className='board-ticket-text'>
                            Ticket No
                        </span>
                        <br/>
                        <span className='board-ticket-number'>
                            {ticketNo}
                        </span>
                        <br/>
                        <span className='board-ticket-subtext'>
                            please proceed to
                        </span>
                        <br/>
                        <span className='board-ticket-counter'>
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
                            <span className='service-queue-lentgh'>{queue1}</span>
                            <span className='service-queue-icon'>
                                {queue1 === 0 ? <TbHourglassEmpty /> : queue1 === 1 ? <BsFillPersonFill /> : <BsFillPeopleFill />}
                            </span>
                            <span className='service-queue-text'>Service 01</span>
                        </div>
                        <div className='service-queue'>
                            <span className='service-queue-lentgh'>{queue3}</span>
                            <span className='service-queue-icon'>
                                {queue3 === 0 ? <TbHourglassEmpty /> : queue3 === 1 ? <BsFillPersonFill /> : <BsFillPeopleFill />}
                            </span>
                            <span className='service-queue-text'>Service 02</span>
                        </div>
                        <div className='service-queue'>
                            <span className='service-queue-lentgh'>{queue2}</span>
                            <span className='service-queue-icon'>
                                {queue2 === 0 ? <TbHourglassEmpty /> : queue2 === 1 ? <BsFillPersonFill /> : <BsFillPeopleFill />}
                            </span>
                            <span className='service-queue-text'>Service 03</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayBoard