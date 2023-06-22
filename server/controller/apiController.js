// const {Configuration, OpenAIApi } = require('openai')
const axios = require("axios");
const Api = require("../model/apiModel");
const dotenv = require("dotenv");
const ApiController = {};
dotenv.config();
// const configuration = new Configuration({
//   apiKey: process.env.OPEN_AI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)

ApiController.getResponse = async (req, res, next) => {
  const { prompt } = req.body; // assuming your prompt is coming in the request body
  console.log("prompt", prompt);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
  };
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content: `given the prompt: ${prompt}, show me three related activities I can do in New York. The response must be a JSON object with the name Events following properties: Event, Location, Time, Summary`,
          },
        ],
      },
      {
        headers: headers,
      }
    );
    const events = response.data.choices[0].message.content;
    res.locals.gpt = events;
    return next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ApiController.completion = async (req, res, next) => {
//   // const {input} = req.body;
//   console.log('completion is activated')
//   fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages:[{role: "user", content: "List of 10 ideas of fun things to do in New York City"}]
//     }),
//     headers: {
//       Authorization: 'Bearer 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',
//       'Content-Type': 'Application/json'
//     }
//   })
//   .then(response => response.json())
//   .then( async (data) => {
//     console.log('WOOOOOOOW', data)
//     console.log('YEEEEEEOBJECTS', data.choices[0].message.content);
//     const response = await Api.create({
//       messages: data.choices[0].message.content
//     })
//     res.locals.ideas = response;
//     console.log('OKK', res.locals.ideas)
//     next()
//   })
// }

// ApiController.getApi = async (req, res, next) => {
//   try {
//     const response = await Api.find({})
//     res.locals.messages = response;
//     return next();
//     }
//   catch (err) {
//     return next(err);
//   }
// }
/*
fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages:[{role: "user", content:`What are some other concepts the artist drake can write about using the idea: ${message}?`}]
    }),
    headers: {
      Authorization: 'Bearer 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',
      'Content-Type': 'Application/json'
    }
  })
  .then(response => response.json())
  .then((data) => {
    console.log('WOOOOOOOW', data)
    console.log('YEEEEEEOBJECTS', data.choices[0].message.content);
    res.locals.ideas = data.choices[0].message.content
    next();
    });
}
*/
module.exports = ApiController;
