import { useEffect } from 'react'
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

    // get all the services
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
    const goToTicket = (serviceID: number) => {
        API.createTicket(serviceID)
          .then(ticket => {
            props.setTicket(ticket);
            // Navigate to the ticket page using the ticketID
            console.log(props.ticket);
            navigate(`/ticket/${props.ticket.ticketID}`);
          })
          .catch(error => {
            console.error("Error creating ticket:", error);
          });
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
                    <Button key={service.ServiceID} className='service-btn' onClick={() => goToTicket(service.ServiceID)}>
                    {service.ServiceName} {/* Button label */}
                    </Button>
                ))}
            </div>

            {/* Help Button */}
            <div className='help-box'>
                <Button className='help-btn'>Need Help?</Button>
            </div>


        </>
    )
}

export default Home;
