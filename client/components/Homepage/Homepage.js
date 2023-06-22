import React, { useState, useEffect } from "react";
import styles from "./Homepage.scss";
import Button from "react-bootstrap/Button";
import Chatbox from "../Chatbox/Chatbox.js";
import NewActivity from "../NewActivity/NewActivity.js";
import axios from "axios";

import { Link } from "react-router-dom";
export const Homepage = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [input, setInput] = useState("");
  const [activity, setActivity] = useState([
    {
      Event: "",
      Location: "",
      Time: "",
      Summary: "",
    },
    {
      Event: "",
      Location: "",
      Time: "",
      Summary: "",
    },
    {
      Event: "",
      Location: "",
      Time: "",
      Summary: "",
    },
  ]);
  // make a get request to chatgbt to display response.

  // const buttonHandler = () => {
  //   console.log('buttonHandle activated')
  //   // useEffect(() => {
  //     fetch('http://localhost:3000/api', {
  //       method: "GET",
  //       headers: {'Content-Type': 'application/json'}
  //     })
  //       .then((data) => data.json())
  //       .then((data) => {
  //         console.log('MEEOWWW', data);
  //         setChatMessage(data[0].messages);
  //         console.log('MEOWW2', chatMessage);
  //       }).catch((err) => {
  //         console.log(err, 'error on the fetch get request')
  //       })
  //   // }, [])
  // }

  //handle submissions to the database from input field
  const submitHandler = (e) => {
    e.preventDefault();
    fetch("URL", {
      method: "POST",
      body: JSON.stringify(), // data we submit,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.messages; // need to match the schema field that is storing the user's responses?
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Test Response
  // const activity = {
  //   activity: "Pioneers Bar NYC",
  //   location: "138 W 29th St, New York, NY 10001",
  //   time: "7:00pm",
  //   summary:
  //     "Laid-back, late-night hangout offering craft beers on tap, bar snacks, pinball machines & pool. PIONEERS is steps away from Penn Station, Madison Square Garden, The PIT Comedy Theater …plus Herald Square, the Fashion Institute of Technology (FIT) and the world-famous Chelsea Hotel.",
  // };
  //handle click
  async function handleClick(e) {
    try {
      // console.log("handle");
      e.preventDefault();
      // const prompt = e.target.value;
      // if (!input) return;
      const response = await axios.post("http://localhost:8000/api", {
        prompt: input,
      });
      console.log(response);
      const data = JSON.parse(response.data);
      console.log(data);
      setActivity(data.Events);
      // setCompletedSentence(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="h1-container">
        <h2>Need Weekend Plans?</h2>
      </div>
      {/* <div className="generate-button-container">
        <Button onClick={ (e)=> buttonHandler(e) } className="generate-button" size="lg" variant="warning">Generate Event Ideas</Button>{' '}
      </div> */}
      <Chatbox
        handleClick={handleClick}
        input={input}
        handleChange={handleChange}
      />
      <h1 className="form-content">New Ideas</h1>
      <NewActivity activity={activity[0]} />
      <NewActivity activity={activity[1]} />
      <NewActivity activity={activity[2]} />
    </div>
  );
};
