const {Configuration, OpenAIApi } = require('openai')
const ApiController = {};
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY, 
})
const openai = new OpenAIApi(configuration)

ApiController.completion = async (req, res, next) => {
  const {input} = req.body;

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages:[{role: "user", content: "List of 10 ideas of fun things to do in New York City"}]
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
    next()
  })
}

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