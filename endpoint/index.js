const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express()

app.use(bodyParser.json());
 
app.post('/webhook', function (req, res) {
  const payload = req.body;
  if (payload.next_action === 'action_get_weather') {
      axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
          params: {
            q: 'Toronto',
            units: 'metric'
          },
          headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "71c60a317amshe0790b2b0142352p185157jsnbb0ec47d42d5"
          }
        })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const temperature = response.data.main.temp;
        console.log(temperature);
        const weatherResponse = {
          "responses": [{
            "text": `The temperature in Toronto right now is ${temperature}`
          }]
        };
        res.send(weatherResponse);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(400).send('Invalid action');
      })
  } else {
    res.sendStatus(400).send('Invalid action');
  }
})
 
app.listen(8000)
