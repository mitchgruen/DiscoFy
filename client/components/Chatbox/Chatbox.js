import React, {useState, useEffect} from "react";
import axios from 'axios';
import '../Homepage/Homepage.scss';


const Chatbox = () => {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");

  

  async function handleClick() {
    try {
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async () => {
    // this should make the post request to /api
    const response = await fetch ('http://localhost:3000/api', {
      method: 'POST',
      body: {
        input: input
      }
    }).then(response => {
      console.log(response);
    })
  };


  return (
    <div className="form-content">
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={5}
        placeholder="Need suggestions for what to do this weekend?"
      />
      <button className="button" onClick={handleClick}>Send!</button>
      {completedSentence && <p>Response: {completedSentence}</p>}
    </div>
  );
}

export default Chatbox;