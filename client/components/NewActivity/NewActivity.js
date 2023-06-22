import React, { useState, useEffect } from "react";
import styles from "./NewActivity.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

// you have to pass props into this component, and update local state based on props
// in the next copmponent up we'll push in three of these newactivity components
const NewActivity = (props) => {
  // console.log("Props Test", props.testActivity);
  const { activity, user } = props;
  const { name, email } = user;
  const { Event, Location, Summary, Time } = activity;
  console.log(props);

  async function saveEvent(e) {
    e.preventDefault();
    console.log("save");
    const response = await axios.post("http://localhost:8000/event", {
      event: Event,
      location: Location,
      summary: Summary,
      time: Time,
      name: name,
      emails: email,
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
    // <div className="container">
    //   <div className="grid">
    //     <div className="activity">
    //       <b>{Event}</b>
    //     </div>
    //     <div className="location">
    //       <b>{Location}</b>
    //       <b>{Time}</b>
    //     </div>
    //   </div>
    //   <div className="summary">{Summary}</div>
    // </div>
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
