import React, { useState, useEffect } from "react";
import socketIoClient from "socket.io-client";

export default function ActivityList() {
    const [events, setEvents] = useState([]);
    const [socket, setSocket] = useState(null);

    const addEvent = (event) => {
        console.log(event); // Log the received message
        setEvents((oldEvents) => [
          ...oldEvents,
          ...(Array.isArray(event) ? event.reverse() : [event]),
        ]);
    };

    useEffect(() => {
        const newSocket = socketIoClient("http://localhost:8000", { autoConnect: false });
    
        const handleNewEvent = (newEvent) => {
            addEvent(newEvent);
        };
    
        newSocket.on("latest", handleNewEvent);
        newSocket.on("event", handleNewEvent);
        newSocket.connect();
    
        setSocket(newSocket);
    
        return () => {
          newSocket.off("latest", handleNewEvent);
          newSocket.off("event", handleNewEvent);
          newSocket.disconnect();
        };
    }, []);

    return (
        <div>
            <div id="eventBox">
                {events.map((event, index) => (
                <div key={index}>
                    {event.summary}
                </div>
                ))}
            </div>
        </div>
    )
}
