import React, {useState, useEffect} from "react";
import styles from './NewActivity.scss'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


// you have to pass props into this component, and update local state based on props
// in the next copmponent up we'll push in three of these newactivity components
const NewActivity = (props) => {
  const [Activity, setActivity] = useState("");


  const [eventState, setEvent] = useState({});

  setEvent({
    activity:
    location:
    time:
    
  })

  
  useEffect(() => {
    setActivity({
      activity: "Pioneers Bar NYC",
      location: "138 W 29th St, New York, NY 10001",
      time: "7:00pm",
      summary: "Laid-back, late-night hangout offering craft beers on tap, bar snacks, pinball machines & pool. PIONEERS is steps away from Penn Station, Madison Square Garden, The PIT Comedy Theater …plus Herald Square, the Fashion Institute of Technology (FIT) and the world-famous Chelsea Hotel."
    })
  }, []);



  return (
    <div className="container">
      <div className="grid">
        <div className="activity"><b>{Activity.activity}</b></div>
        <div className="location"><b>Location:</b>{Activity.location} <b>Time:</b> {Activity.time}</div>
      </div>
      <div className="summary">{Activity.summary}</div>
    </div>
  )
}

export default NewActivity;