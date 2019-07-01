const request = require('request'),
      config = require('../config/config.json'),
      owner = config.ownerID;

var commands =  {
	'myid': {
		desc: 'Sends own user client ID.',
		process: function (client, msg, args) {
    	msg.reply(`Your ID is ${msg.author.id}`);
    }
  },
  'ping': {
		desc: "Sends bot's ping.",
    process: function (client, msg, args) {
      msg.reply(`Your ping is **${Math.round(client.ping)} ms**!`);
    }
  },
  'inviteLink': {
		desc: "Sends bot's invite link.",
		process: function (client, msg, args) {
      msg.reply(`Invite me to another server: ${config.inviteLink}`);
    }
	},
  'activity': {
		desc: "Switches bot's activity!",
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
		desc: 'Apply a stream activity with url to bot.',
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
		desc: 'Gets searched user fortnite status!',
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
				try {
					let userInfo = JSON.parse(body);
					msg.channel.send(`${userInfo.epicUserHandle} killed ${userInfo.lifeTimeStats[10].value} players overall!`);	
				} catch (e) {
					msg.channel.send('User not found!');
				}
			});
    }
	},
  'wtt': {
		desc: 'Gets searched location temperature in Celsius.',
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
		desc: 'Sends search urban dictionary description and url.',
		process: function (client, msg, args) {
      request.get(`https://api.urbandictionary.com/v0/define?term=${args.join("-")}`, function(err, res, body) {
				let json = JSON.parse(body);
				msg.channel.send(`${json.list[0].definition.replace(/\[/g, '').replace(/\]/g, '')} ${json.list[0].permalink}`);
			});
    }
	},
	'help': {
		desc: 'Get the description of the searched command.',
		process: function (client, msg, args) {
			try {
				msg.channel.send(`${commands[args[0]].desc}`);
			} catch (e) {
				msg.channel.send('Invalid parameters!');
			}
		}
	}
};

module.exports = commands;