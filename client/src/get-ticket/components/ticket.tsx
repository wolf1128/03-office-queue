import myIcon from '../../assets/Down_Arrow.svg';
import '../get-ticket.css';

function Ticket(props: any) {

    // get serviceName from serviceID
    const myService = props.services.find( (service: any) => (
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