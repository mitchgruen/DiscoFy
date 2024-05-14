// const {Configuration, OpenAIApi } = require('openai')
const axios = require('axios');
const Api = require('../model/apiModel');
const dotenv = require('dotenv');
const apiController = {};
dotenv.config();
const Mercury = require('@postlight/mercury-parser');
const { convert } = require('html-to-text');
const { get } = require('http');
import contentExtractor from '../functions/content-extractor';

// need to count tokens in a prompt to make sure it doesn't exceed the limit before sending to GPT-3
// Need something in addition to mercury parser to trim webpages down to their essence

apiController.getResponse = async (req, res, next) => {
  console.log('get response is activated');
  const { prompt } = req.body; // assuming your prompt is coming in the request body
  console.log('prompt', prompt);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
  };
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        max_tokens: 400,
        messages: [
          {
            role: 'system',
            content: `given the prompt: ${prompt}, show me three related activities I can do in New York this weekend. The response must be a JSON object with the name Events following properties: Event, Location, Time, Summary`,
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
    console.error('error 3 triggered');
    next(err);
  }
};

async function askGPT3(prompt) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
  };
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      max_tokens: 4000,
      messages: [
        {
          role: 'system',
          content: `${prompt}`,
        },
      ],
    },
    {
      headers: headers,
    }
  );
  return response.data.choices[0].message.content;
}

// need a function to filter urls from certain websites
// Add code to exclude links from certain websites, such as bandsintown and songkick
async function getUrlList(theme, location, time) {
  const url =
    'https://api.bing.microsoft.com/v7.0/search?q=' +
    theme +
    ' concerts, bars, restaurants, events in ' +
    location +
    ' ' +
    time +
    ' -site:yelp.com -site:songkick.com -site:ticketmaster.com -site:eventbrite.com -site:stubhub.com -site:ticketweb.com -site:ticketfly.com -site:ticketnetwork.com -site:ticketcity.com -site:ticketliquidator.com -site:vividseats.com -site:seatgeek.com -site:axs.com -site:goldstar.com -site:ticketclub.com -site:ticketoffices.com -site:bandsintown.com -site:ticketmaster.com -site:eventbrite.com -site:stubhub.com -site:ticketweb.com -site:ticketfly.com -site:ticketnetwork.com -site:ticketcity.com -site:ticketliquidator.com -site:vividseats.com -site:seatgeek.com -site:axs.com -site:goldstar.com -site:ticketclub.com -site:ticketoffices.com';
  console.log(url);
  const response = await axios.get(url, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
    },
  });
  // console.log(response.data.webPages);
  const urls = response.data.webPages.value.map((page) => page.url);
  console.log('Urls', urls);
  const filteredUrls = filterUrlList(urls);
  console.log('Filtered Urls', filteredUrls.slice(0, 10));
  return filteredUrls.slice(0, 10);
}

// How to automaticall remove urls from a long list of blocked urls
function filterUrlList(urlList) {
  return urlList.filter((url) => {
    return !(
      url.includes('bandsintown') ||
      url.includes('songkick') ||
      url.includes('ticketmaster') ||
      url.includes('eventbrite') ||
      url.includes('stubhub') ||
      url.includes('ticketweb') ||
      url.includes('ticketfly') ||
      url.includes('ticketnetwork') ||
      url.includes('ticketcity') ||
      url.includes('ticketliquidator') ||
      url.includes('vividseats') ||
      url.includes('seatgeek') ||
      url.includes('axs') ||
      url.includes('goldstar') ||
      url.includes('ticketclub') ||
      url.includes('ticketoffices')
    );
  });
}

async function getContextFromUrl(url) {
  console.log('URL', typeof url, url);
  try {
    const response = await Mercury.parse(url).then((result) => {
      return removePunctuation(convert(result.content));
    });
    console.log('Response', response);
    return response;
  } catch (err) {
    console.error('error triggered oh my god!', err);
  }
}

apiController.testContextExtraction = async (req, res, next) => {
  const url =
    'https://www.businessinsider.com/neuralink-elon-musk-microchips-brains-ai-2021-2';
  // const context = await getContextFromUrl(url);
  contentExtractor.ParseWithMercury(url);
  res.status(200).json(context);
};

async function createContext(urlList) {
  let loading = 0;
  let context = '';
  for (url of urlList) {
    console.log('Loading: ' + loading + '%');
    loading += 10;
    context += ' ' + (await getContextFromUrl(url));
  }
  // console.log('Create Context', context);
  return context;
}

// modify gpt instructions to incorporate data from req.body

apiController.getActivities = async (req, res, next) => {
  try {
    let { theme, location, time } = req.body;
    theme = theme.toLowerCase();
    location = location.toLowerCase();
    time = time.toLowerCase();
    const urlList = await getUrlList(theme, location, time);
    const context = await createContext(urlList);
    const prompt =
      'Return a list of 3 ' +
      (theme.includes('bar') ||
      theme.includes('restaurant') ||
      theme.includes('concert') ||
      theme.includes('event')
        ? theme
        : 'events, bars, concerts, and/or restaurants') +
      ' in ' +
      location +
      ' ' +
      (time != 'any' ? time : '') +
      gptBoilerplate +
      context;
    console.log('Prompt', prompt);
    try {
      const response = await askGPT3(prompt);
      console.log('API Call Successful');
      const responseArray = JSON.parse(response);
      console.log('Response Array', responseArray);
      res.status(200).json(responseArray);
    } catch (err) {
      console.error('error 1 triggered', err);
      next(err);
    }
  } catch (err) {
    console.error('error 2 triggered');
    next(err);
  }
};

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

// apiController.Postlight = async (req, res, next) => {
//   try {
//     await getContextFromUrl(url);
//     return next();
//   } catch (err) {
//     console.error('error triggered');
//     next(err);
//   }
// };

function removePunctuation(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '"' && str[i] !== '\n') {
      result += str[i];
    }
  }
  return result;
}

const summaryFormats =
  'Event: {Event Name}, a {Event Description}, is happening at {Location} on {Date} at {Time}.' +
  'Concert: {Artist Name} is playing {Venue Name} on {Date} at {Time}. {Openers if any} is opening.' +
  'Restaurant: Enjoy some incredible {Cuisine Type} food at {Restaurant Name} in {Neighborhood Name}.' +
  'Bar: {Bar Name} is a {dive/upscale/casual/fancy/lively/} {bar/club} in {Neighborhood Name}.';
const responseFormat =
  '[{"Name": "Item Name", (OPTIONAL)"LocationName": "Item Location Name", "Address": "Item Address", "Summary": "Item Summary", "URL": "Item URL", (OPTIONAL)"Time": "Item Time"}]';

const parseFormat =
  '{"Name": "Item Name", (OPTIONAL)"LocationName": "Item Location Name", "Address": "Item Address", "Summary": "Item Summary", "URL": "Item URL", (OPTIONAL)"Time": "Item Time"}';

const gptBoilerplate =
  '. Your response should be formatted identically to ' +
  responseFormat +
  ' There is an optional Location property, included for concerts and events. E.g., The Rolling Stones (Name) at Madison Square Garden (Location)' +
  'There is an optional time property, included for concerts and events, includes Month, Date, Day, Time' +
  'The summary, which is just one property on each standardized JSON object, will be formatted according to the following ' +
  summaryFormats +
  'If the event is a concert, you will use the concert summary format' +
  'If the event is a restaurant, you will use the restaurant summary format' +
  'If the event is a bar, you will use the bar summary format' +
  'If the event is a general event, you will use the event summary format' +
  'The attached context will give you current info that helps you to respond.';

const testArray = [
  {
    Name: 'Item Name',
    LocationName: 'Item Location Name',
    Address: 'Item Address',
    Summary: 'Item Summary',
    URL: 'Item URL',
    Time: 'Item Time',
  },
  {
    Name: 'Item Name',
    LocationName: 'Item Location Name',
    Address: 'Item Address',
    Summary: 'Item Summary',
    URL: 'Item URL',
    Time: 'Item Time',
  },
  {
    Name: 'Item Name',
    LocationName: 'Item Location Name',
    Address: 'Item Address',
    Summary: 'Item Summary',
    URL: 'Item URL',
    Time: 'Item Time',
  },
];

function timesCalled() {
  let count = 0;
  return function () {
    count++;
    console.log('Times Called: ' + count);
  };
}
const counter = timesCalled();

module.exports = apiController;
