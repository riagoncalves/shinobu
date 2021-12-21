const fetch = require('node-fetch');

module.exports = {
  desc: function(prefix) {
    return `Gets searched location temperature in Celsius.\nWrite \`${prefix}wtt <city_name>\` to use.`;
  },
  process: function(client, message, args) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${args.join('+')}&APPID=${process.env.API_WTT}`).then(res => res.json())
      .then(wttInfo => {
        try {
          message.channel.send(`${wttInfo.name} ${Math.round(wttInfo.main.temp - 273.15)}ºC`);
        }
        catch(e) {
          message.channel.send('Invalid location!');
        }
      });
  },
};