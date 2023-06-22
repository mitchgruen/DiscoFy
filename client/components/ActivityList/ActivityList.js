import React, { useState, useEffect } from "react";
import socketIoClient from "socket.io-client";
import axios from "axios";

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

    const addCalendarEvent = async (e, activity) =>  {
        console.log(e);
        const response = await axios.post("http://localhost:8000/schedule_event", {
            location: activity.location,
            summary: activity.summary,
            event: activity.event,
          });
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
                <h1>Live Activities</h1>
                {events.map((event, index) => (
                <div key={index}>
                    <h4>{event.event}</h4>
                    <p>{event.summary}</p>
                    <p>{event.location}</p>
                    <p> {event.time}</p>
                    <p> {event.name}</p>
                    <p>{event.email}</p>
                    <button className="button" onClick={(e) => addCalendarEvent(e, event)}>
                        Add to Calendar!
                    </button>    
                </div>
                ))}
            </div>
        </div>
    )
}
