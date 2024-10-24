import myIcon from "../../assets/Down_Arrow.svg";
import { Service, Props } from "../../interfaces/types.ts";
import "../get-ticket.css";

function Ticket(props: Props) {

    // get serviceName from serviceID
    const myService = props.services.find( (service: Service) => (
            service.ServiceID === props.ticket.serviceID
        )
    );

    return (
        <> 
            <div className="custom-homepage">           
                {/* Ticket Details */}
                <div className="custom-ticket-details">
                    <span>
                        Ticket Details
                    </span>
                </div>

                {/* Ticket Number Box */}
                <div className="custom-ticket-box">
                    <span className="custom-ticket-text">
                        Your Ticket Number
                    </span>
                    <br/>
                    <span className="custom-ticket-number">
                        {props.ticket.ticketID}
                    </span>
                    
                </div>
                
                {/* Information Box */}
                <div className="custom-information-box">
                    <div className="custom-padding"></div>
                    {/* TODO */}
                    {/* <div className="custom-waiting-time">
                        Waiting Time
                        <div className="custom-waiting-time-number">{props.ticket.estimatedTime}</div>
                    </div> */}
                    <div className="custom-service-type">
                        Service Type
                        <div className="custom-service-type-number">
                            {myService ? myService.ServiceName : "Unknown Service"}
                        </div>
                    </div>
                    <div className="custom-padding"></div>
                </div>

                {/* Get Your Receipt */}
                <div className="custom-get-receipt">
                    <span className="custom-get-receipt-text">
                        Get your Receipt
                    </span>
                    <br/> 
                    <span className="custom-get-receipt-icon">   
                        <img src={myIcon} alt="My Local Icon" width="60" height="60" />
                    </span>
                </div>
            </div>
        </>
    )
}

export default Ticket