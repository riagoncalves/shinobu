const request = require('request'),
      config = require('../config/config.json'),
      owner = config.ownerID;

module.exports =  {
	'myid': {
		process: function (client, msg, args) {
    	msg.reply(`Your ID is ${msg.author.id}`);
    }
  },
  'ping': {
    process: function (client, msg, args) {
      msg.reply(`Your ping is **${Math.round(client.ping)} ms**!`);
    }
  },
  'inviteLink': {
		process: function (client, msg, args) {
      msg.reply(`Invite me to another server: ${config.inviteLink}`);
    }
	},
  'activity': {
		process: function (client, msg, args) {
      if (msg.author.id === owner){
				let type = args.shift();
				client.user.setActivity(args.join(' '), { type: type.toUpperCase() });
	
				switch (type.toLowerCase()) {
					case 'listening':
							msg.reply(`I'm listening to ${args.join(' ')}!`);
						break;
					
					case 'playing':
						msg.reply(`I'm playing ${args.join(' ')}!`);
						break;
	
					case 'watching':
						msg.reply(`I'm watching to ${args.join(' ')}!`);
						break;
				}
			} else {
				msg.reply("You don't have permissions to do that!")
			}
    }
	},
  'stream': {
		process: function (client, msg, args) {
      if (msg.author.id === owner) {
				client.user.setActivity(args[0], { type: "STREAMING", url: args[1] });
				msg.reply(`Streaming ${args[0]}!`);
			} else {
				msg.reply("You don't have permissions to do that!")
			}
    }
	},
  'ftn': {
		process: function (client, msg, args) {
      if (args[0] != 'pc' && args[0] != 'psn' && args[0] != 'xb1'){
				msg.channel.send('Invalid parameters!');
				return;
			}
	
			request({
				method: 'GET',
				url: `https://api.fortnitetracker.com/v1/profile/${args[0]}/${(args.slice(1)).join('%20')}`,
				headers: {
					'TRN-Api-Key': `${config.apiFTN}`
				}
			}, function(err, res, body) {
				let userInfo = JSON.parse(body);
				msg.channel.send(`${userInfo.epicUserHandle} killed ${userInfo.lifeTimeStats[10].value} players overall!`);		
			});
    }
	},
  'wtt': {
		process: function (client, msg, args) {
      request.get(`http://api.openweathermap.org/data/2.5/weather?q=${args.join("+")}&APPID=${config.apiWTT}`, function(err, res, body) {
				try {
					let wttInfo = JSON.parse(body);
					msg.channel.send(`${wttInfo.name} ${Math.round(wttInfo.main.temp - 273.15)}ºC`)
				} catch(e) {
					msg.channel.send('Invalid location!');
				}
			});
    }
	},
  'urban': {
		process: function (client, msg, args) {
      request.get(`https://api.urbandictionary.com/v0/define?term=${args.join("-")}`, function(err, res, body) {
				let json = JSON.parse(body);
				msg.channel.send(`${json.list[0].definition.replace(/\[/g, '').replace(/\]/g, '')} ${json.list[0].permalink}`);
			});
    }
	}
};