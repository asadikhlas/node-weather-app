// const chalk = require("chalk");


// // console.log(chalk.white.bgBlue.bold('Hello world!'));
// // console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
// // console.log(chalk.white('Hello', chalk.underline.bgRed('world') + '!'));
// console.log(chalk.white.bgCyan.bold('City Name: '), chalk.blue('world'))

const requestIp = require('request-ip');
const request = require("request");
 
const getLocation = () => {
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=609f16d5f6274575917f85da38b54863&ip=${requestIp}&fields=city`

    request(url, (err, response, body)=> {
      const info = JSON.parse(body)
      console.log(info)
})}

getLocation()
 
 


 