import { useState, useEffect } from 'react'
import '../call-customer.css';
import Clock from './Clock.tsx';
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TbHourglassEmpty } from "react-icons/tb";
import { Props, NotificationsResponse } from '../../interfaces/types.ts';
import API from '../../API/API.ts';

function DisplayBoard(props: Props) {

    const [notifications, setNotifications] = useState<NotificationsResponse>(
        {
            myTicket: {
              ticketID: 1,
              serviceID: 1,
              counterID: 1,
              issuedTime: "",
              estimatedTime: 0,
              status: ""
            },
            displayBoard: {
              nextTicket: {
                ticketID: 1,
                serviceID: 1,
                counterID: 1,
                issuedTime: "",
                estimatedTime: 0,
                status: ""
              },
              queues: [
                {
                  ServiceName: "",
                  length: 0
                }
              ]
            }
          }
    );

    // Function to fetch notifications
    const fetchNotifications = () => {
        API.getNotifications(props.ticket.ticketID)
            .then((notifications: NotificationsResponse) => {
                setNotifications(notifications);
            });
    };

    // Fetch notifications on component mount and set up interval
    useEffect(() => {
        fetchNotifications(); // Initial fetch
        
        const intervalId = setInterval(fetchNotifications, 15000); // Fetch every 15 seconds

        // Cleanup the interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []); // Empty dependency array to run once on mount

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
                            {notifications ? notifications.displayBoard.nextTicket.ticketID : "Loading..."}
                        </span>
                        <br/>
                        <span className='board-ticket-subtext'>
                            please proceed to
                        </span>
                        <br/>
                        <span className='board-ticket-counter'>
                            {notifications ? notifications.displayBoard.nextTicket.counterID : "Loading..."}
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
                        {notifications?.displayBoard.queues.map((item, index) => (
                            <div key={index} className='service-queue'>
                                <span className='service-queue-lentgh'>{item.length}</span>
                                <span className='service-queue-icon'>
                                    {item.length === 0 ? (
                                        <TbHourglassEmpty />
                                    ) : item.length === 1 ? (
                                        <BsFillPersonFill />
                                    ) : (
                                        <BsFillPeopleFill />
                                    )}
                                </span>
                                <span className='service-queue-text'>{item.ServiceName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayBoard