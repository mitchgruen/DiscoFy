import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIoClient from "socket.io-client";


// you have to pass props into this component, and update local state based on props
// in the next copmponent up we'll push in three of these newactivity components
const NewActivity = (props) => {
  const [socket, setSocket] = useState(null);
  // console.log("Props Test", props.testActivity);
  const { activity, user } = props;
  const { name, email } = user;
  const { Event, Location, Summary, Time } = activity;

  useEffect(() => {
    const newSocket = socketIoClient("http://localhost:8000", { autoConnect: false });

    // const handleNewMessage = (newMessage) => {
    //   addMessage(newMessage);
    // };

    // newSocket.on("latest", handleNewMessage);
    // newSocket.on("message", handleNewMessage);
    newSocket.connect();

    setSocket(newSocket);

    return () => {
      // newSocket.off("latest", handleNewMessage);
      // newSocket.off("message", handleNewMessage);
      newSocket.disconnect();
    };
  }, []);

  async function saveEvent(e) {
    e.preventDefault();
    console.log("save");
    const response = await axios.post("http://localhost:8000/event", {
      event: Event,
      location: Location,
      summary: Summary,
      time: Time,
      name: name,
      email: email,
    });
    socket.emit("event", {
      event: Event,
      location: Location,
      summary: Summary,
      time: Time,
      name: name,
      email: email,
    });
    console.log(response);
  }

  return (
    <div className="container">
      <div className="grid">
        <h4>{Event}</h4>
        <p>{Location}</p>
        <p> {Time}</p>
        <p>{Summary}</p>
      </div>
      <button className="button" onClick={saveEvent}>
        Add to Event List!
      </button>
    </div>
  );
};

// ADD BUTTONx
/**
 * button tag
 * on click, send a request to the back en
 * from the backend, send a post request to the database
 * create a new event instance in the DB
 * reference createStudent
 * event.create will create a new instance of the event in our DB
 * this will go in a new controller
 */

export default NewActivity;
