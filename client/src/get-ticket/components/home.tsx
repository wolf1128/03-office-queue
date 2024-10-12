import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import '../get-ticket.css';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();
    const goToTicket = () => {
      navigate('/ticket');  // Navigate to the Home page
    };

    return (
        <>
            {/* Ticket Details */}
            <div className='ticket-details'>
                <span>
                    Select a Service
                </span>
            </div>

            {/* Button Containers */}
            <div className='button-container'>
                <Button className='service-btn' onClick={goToTicket}>Service 01</Button>
                <Button className='service-btn'>Service 02</Button>
                <Button className='service-btn'>Service 04</Button>
                <Button className='service-btn'>Service 03</Button>
            </div>

            {/* Help Button */}
            <div className='help-box'>
                <Button className='help-btn'>Need Help?</Button>
            </div>


        </>
    )
}

export default Home