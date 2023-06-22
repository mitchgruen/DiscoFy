import React, { useState, useEffect } from "react";
import styles from "./Homepage.scss";
import Button from "react-bootstrap/Button";
import Chatbox from "../Chatbox/Chatbox.js";
import NewActivity from "../NewActivity/NewActivity.js";
import axios from "axios";

import { Link } from "react-router-dom";
export const Homepage = (props) => {
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
  useEffect(() => {
    console.log("User: ", props);
  }, []);

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
