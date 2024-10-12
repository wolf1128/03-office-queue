import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import '../get-ticket.css';
import { useNavigate } from 'react-router-dom';
import API from '../../API/API.tsx';

function Home(props: any) {

    const dirty = props.dirty;
    const setDirty = props.setDirty;

    useEffect(() => {
        setDirty(true);
      }, [])

    //estraggo l'elenco di tutte le pagine
    useEffect(() => {
        if (dirty) {
          API.getAllServices()
            .then(services => {
              props.setServices(services);
              setDirty(false);
            });
        }
    }, [dirty]);

    const AllServices = props.services;
    
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
                {AllServices.map( (service: any) => (
                    <Button key={service.ServiceID} className='service-btn' onClick={() => goToTicket()}>
                    {service.ServiceName} {/* Button label */}
                    </Button>
                ))}
                {/*
                <Button className='service-btn' onClick={goToTicket}>Service 01</Button>
                <Button className='service-btn'>Service 02</Button>
                <Button className='service-btn'>Service 04</Button>
                <Button className='service-btn'>Service 03</Button>
                 */}
            </div>

            {/* Help Button */}
            <div className='help-box'>
                <Button className='help-btn'>Need Help?</Button>
            </div>


        </>
    )
}

export default Home;
