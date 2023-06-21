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
    console.log('In the fetch request');
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        //prompt: `Complete this sentence: "${input}"`,
        "model": "gpt-3.5-turbo",
        "max_tokens": 100,
        "messages": [{"role": "system", "content": `${input}`}]
      },
      {
        headers: {
          // "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
      }
    );
    return response.data.choices[0].message.content;
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