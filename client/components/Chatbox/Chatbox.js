import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Homepage/Homepage.scss";

const Chatbox = (props) => {
  const { handleClick, input, handleChange } = props;
  //handle click

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
    </div>
  );
};

export default Chatbox;
