const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-srv:4000/events', event).catch(e => console.log('posts err'));
  axios.post('http://comments-srv:4001/events', event).catch(e => console.log('comments err'));
  axios.post('http://query-srv:4002/events', event).catch(e => console.log('query err'));
  axios.post('http://moderation-srv:4003/events', event).catch(e => console.log('moderation err'));

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('k8s')
  console.log('Listening on 4005');
});
