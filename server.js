const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const apiKey = process.env.API_KEY;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//app.locals.weather = '';
//app.locals.error = '';

app.get('/', (req, res) =>
{
  res.render('index', { weather: null, error: null });
});

app.post('/', (req, res) =>
{
  //res.render('index');
  
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  request(url, (error, response, body) =>
  {
    if(error)
    {
      res.render('index', { weather: null, error: 'An error ocurred' });
    }
    else
    {
      let weather_data = JSON.parse(body);
      if(weather_data.main == undefined)
      {
        res.render('index', { weather: null, error: 'An error ocurred 2' });
      }
      else
      {
        let message = `The temperature in ${weather_data.name} is ${weather_data.main.temp} celsius`;
        res.render('index', { weather: message, error: null });
      }
    }
  });
})

app.listen(3000, function ()
{
  console.log('Listening on port 3000');
});



