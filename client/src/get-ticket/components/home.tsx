import Button from 'react-bootstrap/Button';
import '../get-ticket.css';
import { useNavigate } from 'react-router-dom';
import API from '../../API/API.ts';

function Home(props: any) {
    
    const navigate = useNavigate();
    const goToTicket = (serviceID: number) => {
        API.createTicket(serviceID)
          .then(ticket => {
            props.setTicket(ticket);
            // Navigate to the ticket page using the ticketID
            navigate(`/ticket/${props.ticket.ticketID}`);
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
                {props.services.map( (service: any) => (
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
