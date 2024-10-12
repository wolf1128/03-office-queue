import { useEffect } from 'react'
import myIcon from '../../assets/Down_Arrow.svg';
import '../get-ticket.css';
import API from '../../API/API.tsx';


function Ticket(props: any) {

    // get all services only the fistr time you enter the page
    useEffect(() => {
        API.getAllServices()
            .then(services => {
                props.setServices(services);
            })
            .catch(error => {
                console.error("Error fetching services:", error);
            });
    }, []);

    const AllServices = props.services;

    // get serviceName from serviceID
    const myService = AllServices.find( (service: any) => (
            service.ServiceID === props.ticket.serviceID
        )
    );

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
                    {props.ticket.ticketID}
                </span>
                
            </div>
            
            {/* Information Box */}
            <div className='information-box'>
                <div className='waiting-time'>
                    Waiting Time
                    <div className='waiting-time-number'>{props.ticket.estimatedTime}</div>
                </div>
                <div className='service-type'>
                    Service Type
                    <div className='service-type-number'>{myService.ServiceName}</div>
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