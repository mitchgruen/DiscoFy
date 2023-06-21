const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const PORT = 3000;
//this is the problem
const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');
const axios = require('axios');

const dotenv = require('dotenv').config()
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// WHERE IS THE MONGO_URI?
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })

// confirms that the connection works (just a console log to confirm we are connected).
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

//user routes
app.use('/user', userRouter);
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  console.log('Hello from the backend');
})

// Attempt at ChatGPT Post Request
// app.post('/api', async (req, res) => {
//   const response = await axios.post(
//     "https://api.openai.com/v1/chat/completions",
//     {
//       "model": "gpt-3.5-turbo",
//       "max_tokens": 100,
//       "messages": [{"role": "system", "content": `${req.body}`}]
//     },
//     {
//       headers: {
//         "Authorization": "Bearer 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"
//       },
//     }
//   );
//   return res.status(200).send(response.data.choices[0].message.content);
// })

// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
app.use('*', (req, res) => res.status(400).send('Oh no! There is an error!'))

//global error
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
})

app.listen(PORT, () => { console.log('Listening on port 3000... idea generator app') });
// mongoose.connect(
//   process.env.MONGO_URI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
// )
//   .then(() => {
//     app.listen(PORT, () => {
//       `listening on ${PORT}`
//     });
//     console.log('Connected to MongoDB')
//       .catch(err => console.log(err));
//    app.use('/', userRouter);
//   })