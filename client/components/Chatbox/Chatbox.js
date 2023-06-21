import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Homepage/Homepage.scss";

const Chatbox = () => {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");

  //handle click
  async function handleClick(e) {
    try {
      // console.log("handle");
      e.preventDefault();
      // const prompt = e.target.value;
      // if (!input) return;
      const response = await axios.post("http://localhost:8000/api", {
        prompt: "movie",
      });
      // const data = response.data;
      // setCompletedSentence(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

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
        onChange={(event) => setInput(event.target.value)}
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
