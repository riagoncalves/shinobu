const fetch = require('node-fetch');

module.exports = {
  desc: function(prefix) {
    return `Gets searched location temperature in Celsius.\nWrite \`${prefix}wtt <city_name>\` to use.`;
  },
  process: function(client, msg, args) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${args.join('+')}&APPID=${process.env.API_WTT}`).then(res => res.json())
      .then(wttInfo => {
        try {
          msg.channel.send(`${wttInfo.name} ${Math.round(wttInfo.main.temp - 273.15)}ºC`);
        }
        catch(e) {
          msg.channel.send('Invalid location!');
        }
      });
  },
};