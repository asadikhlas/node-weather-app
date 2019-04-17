const request = require("request");
const chalk = require("chalk");
const city = process.argv[2];
const dns = require('dns')
let getIp = ``

// const requestIp = require('request-ip');

//oldKey= VMNnaA2Qh0floOQkrFA7UPC8r4yRXdS5
//umair key= san4GqjWsND0tGapYRWyB1knt8XtgkgP

const getNews = countryId => {
  const url = `https://newsapi.org/v2/everything?q=${countryId}?&apiKey=fec47e089e3a4635b9f0708267ce50e2`;
  request(url, (error, response, body) => {
    const info = JSON.parse(body);
    console.log("\t \t \t \t \t" + chalk.white.bgRed.bold("News for " + countryId));
    console.log("\n")
    for (let i = 0; i <= 4; i++) {
      console.log(chalk.white.bgCyan.bold("Author: "), chalk.blue (info.articles[i].author));
      console.log("\n")
      console.log(chalk.white.bgCyan.bold("Title: "), chalk.blue (info.articles[i].title));
    }
  });
};

const getCountry = cityId => {
  const url = `http://dataservice.accuweather.com/locations/v1/${cityId}?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP`;
  request(url, (err, response, body) => {
    const info = JSON.parse(body);
    // console.log(info)
    console.log(
      "\t \t \t \t" + chalk.white.bgRed.bold("Your City Information")
    );
    console.log("\n")
    console.log(
      chalk.white.bgCyan.bold("Country Name: "),
      chalk.blue(info.Country.LocalizedName)
    );
    console.log("\n")
    console.log(
      chalk.white.bgCyan.bold("Province: "),
      chalk.blue(info.AdministrativeArea.LocalizedName)
    );
    console.log("\n")
    console.log("\t \t \t \t \t" + chalk.white.bgRed.bold("GeoPosition"));
    console.log("\n")
    console.log(
      chalk.white.bgCyan.bold("Latitude:"),
      chalk.blue(info.GeoPosition.Latitude)
    );
    console.log("\n")
    console.log(
      chalk.white.bgCyan.bold("Longitude:"),
      chalk.blue(info.GeoPosition.Longitude)
    );
    getNews(info.Country.LocalizedName);
  });
  // console.log(cityId)
};

const getWeather = cityId => {
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityId}?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP&metric=true`;
  request(url, (err, response, body) => {
    const info = JSON.parse(body);
    const getForecast = info.DailyForecasts;
    // console.log(getForecast)
    console.log(
      "\t \t \t \t \t" + chalk.white.bgRed.bold("Weather information")
    );
    console.log("\n")
    getForecast.map(item => {
      console.log(
        chalk.white.bgCyan.bold("Minimum Temperature: "),
        chalk.blue(
          item.Temperature.Minimum.Value + item.Temperature.Minimum.Unit
        )
      );
      console.log("\n")
    });
    getForecast.map(item => {
      console.log(
        chalk.white.bgCyan.bold("Maximum Temperature: "),
        chalk.blue(
          item.Temperature.Maximum.Value + item.Temperature.Maximum.Unit
        )
      );
    });
  });
};

const gatherData = (city,address, callback) => {
  if (!city) {
    console.log(chalk.white.bgRed('Finding City by your IP ...'))
  } else {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=san4GqjWsND0tGapYRWyB1knt8XtgkgP&q=${city}`;
    request(url, (err, response, body) => {
      const info = JSON.parse(body);
      // console.log(info)
      for (let i = 0; i < info.length; i++) {
        // console.log(info[i].Key)
        getCountry(info[i].Key);
        getWeather(info[i].Key);
        break;
      }
    });
  }
};

gatherData(city);


//han dekh sai ha??