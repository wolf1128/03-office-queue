import { useState, useEffect } from 'react'
import '../call-customer.css';
import Clock from './Cclock.tsx';
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TbHourglassEmpty } from "react-icons/tb";
import { Service, Props, NotificationsResponse } from '../../interfaces/types.ts';
import API from '../../API/API.ts';

function DisplayBoard() {

    const [notifications, setNotifications] = useState<NotificationsResponse>(
        {
            "data": {          
                "TicketID": 0,
                "CounterID": 0,
                "CounterLabel": ""
            },
            "waitingQueue": [
                {   
                "ServiceID": 0,
                "ServiceName": "",
                "noOfPeople": 0
                },
                {
                "ServiceID": 0,
                "ServiceName": "",           
                "noOfPeople": 0
                },
                {
                "ServiceID": 0,
                "ServiceName": "",           
                "noOfPeople": 0
                },
                {
                "ServiceID": 0,
                "ServiceName": "",           
                "noOfPeople": 0
                }     
            ]
           }
    );

    // Function to fetch notifications
    const fetchNotifications = () => {
        API.getNotifications()
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

    /*
    useEffect(() => {
        // WebSocket connection
        const socket = new WebSocket('ws://localhost:3001'); // Adjust URL as needed

        // Event listener for receiving messages
        socket.onmessage = (event) => {
            const notifications: NotificationsResponse = JSON.parse(event.data);
            setNotifications(notifications);
        };

        // Cleanup WebSocket on unmount
        return () => {
            socket.close();
        };
    }, []); // Empty dependency array to run once on mount
    
    */

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
                            {notifications ? notifications.data.TicketID : "Loading..."}
                        </span>
                        <br/>
                        <span className='board-ticket-subtext'>
                            please proceed to
                        </span>
                        <br/>
                        <span className='board-ticket-counter'>
                            {notifications ? notifications.data.CounterLabel : "Loading..."}
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
                        {notifications?.waitingQueue.map((item) => (
                            <div key={item.ServiceID} className='service-queue'>
                                <span className='service-queue-lentgh'>{item.noOfPeople}</span>
                                <span className='service-queue-icon'>
                                    {item.noOfPeople === 0 ? (
                                        <TbHourglassEmpty />
                                    ) : item.noOfPeople === 1 ? (
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