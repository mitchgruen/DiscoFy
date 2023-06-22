import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Homepage/Homepage.scss";

const Chatbox = (props) => {
  const [completedSentence, setCompletedSentence] = useState("");
  const { handleClick, handleChange, input } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
    };
    axios.post("https://reqres.in/api/login", userData).then((response) => {
      console.log(response.status, response.data.token);
    });
  };

  return (
    <div className="form-content">
      <textarea
        value={input}
        onChange={handleChange}
        rows={5}
        placeholder="Need suggestions for what to do this weekend?"
      />
      <button className="button" onClick={handleClick}>
        Send!
      </button>
      {completedSentence && <p>Response: {completedSentence}</p>}
    </div>
  );
};

export default Chatbox;
