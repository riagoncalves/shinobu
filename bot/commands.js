const request = require('request'),
			Discord = require('discord.js'),
			YouTube = require("discord-youtube-api"),
			owner = process.env.OWNER_ID,
			version = require('../package.json').version,
			parseChangelog = require('changelog-parser'),
			GoogleImages = require('google-images'),
			imagesClient = new GoogleImages(process.env.CSE_ID, process.env.API_GI),
			youtube = new YouTube(process.env.API_YT);

let aliases = {
	'id': 'myid', 'mid': 'myid',
	'invite': 'invitelink', 'inv': 'invitelink',
	'status': 'activity', 'play': 'activity',
	'fortnite': 'ftn',
	'w': 'wtt', 'weather': 'wtt',
	'ud': 'urban', 'urbandictionary': 'urban', 'udictionary': 'urban',
	'images': 'gi', 'google-images': 'gi', 'gimages': 'gi',
	'youtube': 'yt', 'video': 'yt',
	'changelog': 'log', 'clog': 'log',
	'v': 'version',
	'h': 'help'
}

let commands =  {
	'myid': {
		desc: `Sends own user client ID.\nWrite \`${process.env.PREFIX}myid\` to use.`,
		process: function (client, msg, args) {
    	msg.reply(`Your ID is ${msg.author.id}`);
    }
  },
  'ping': {
		desc: `Sends bot's ping.\nWrite \`${process.env.PREFIX}ping\` to use.`,
    process: function (client, msg, args) {
      msg.reply(`Your ping is **${Math.round(client.ping)} ms**!`);
    }
  },
  'invitelink': {
		desc: `Sends bot's invite link.\nWrite \`${process.env.PREFIX}invitelink\` to use.`,
		process: function (client, msg, args) {
      msg.reply(`Invite me to another server: ${process.env.INVITE_LINK}`);
    }
	},
  'activity': {
		desc: `Switches bot's activity!\nWrite \`${process.env.PREFIX}activity <listening/playing/watching> <activity>\` to use.`,
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
		desc: `Apply a stream activity with url to bot.\nWrite \`${process.env.PREFIX}stream <game_name> <stream_url>\` to use.`,
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
		desc: `Gets searched user fortnite status!\nWrite \`${process.env.PREFIX}ftn <pc/psn/xb1> <player_name>\` to use.`,
		process: function (client, msg, args) {
      if (args[0] != 'pc' && args[0] != 'psn' && args[0] != 'xb1'){
				msg.channel.send('Invalid parameters!');
				return;
			}
	
			request({
				method: 'GET',
				url: `https://api.fortnitetracker.com/v1/profile/${args[0]}/${(args.slice(1)).join('%20')}`,
				headers: {
					'TRN-Api-Key': `${process.env.API_FTN}`
				}
			}, function(err, res, body) {
				let userInfo = JSON.parse(body);
				try {
					msg.channel.send(`${userInfo.epicUserHandle} killed ${userInfo.lifeTimeStats[10].value} players overall!`);	
				} catch (e) {
					msg.channel.send(userInfo.error);
				}
			});
    }
	},
  'wtt': {
		desc: `Gets searched location temperature in Celsius.\nWrite \`${process.env.PREFIX}wtt <city_name>\` to use.`,
		process: function (client, msg, args) {
      request.get(`http://api.openweathermap.org/data/2.5/weather?q=${args.join("+")}&APPID=${process.env.API_WTT}`, function(err, res, body) {
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
		desc: `Sends search urban dictionary description and url.\nWrite \`${process.env.PREFIX}urban <search>\` to use.`,
		process: function (client, msg, args) {
      request.get(`https://api.urbandictionary.com/v0/define?term=${args.join("-")}`, function(err, res, body) {
				let json = JSON.parse(body);
				msg.channel.send(`${json.list[0].definition.replace(/\[/g, '').replace(/\]/g, '')} ${json.list[0].permalink}`);
			});
    }
	},
	'gi': {
		desc: `Get searched image.\nWrite \`${process.env.PREFIX}gi <search>\` to use.`,
		process: async function (client, msg, args) {
			try {
				let images = await imagesClient.search(args.join(' ')),
						replyImage = images[Math.floor(Math.random() * images.length)].url;
				if (!replyImage.endsWith('.png') && !replyImage.endsWith('.jpeg') && !replyImage.endsWith('.jpg')){
					replyImage = `${replyImage}.jpg`;
				}
				msg.channel.send(new Discord.Attachment(replyImage));
			}
			catch (e) {
				console.error(e);
				msg.channel.send('No results!');
			}
		}
	},
	'yt': {
		desc: `Sends youtube searched video.\nWrite \`${process.env.PREFIX}yt\` to use.`,
		process: async function (client, msg, args) {
			try {
				let video = await youtube.searchVideos(args.join(' '));
				msg.channel.send(`https://www.youtube.com/watch?v=${video.id}`);
			}
			catch (e) {
				console.error(e);
				msg.channel.send('No results!');
			}
		}
	},
	'ship': {
		desc: `Ship a couple.\nWrite \`${process.env.PREFIX}ship <user1> <user2>\` to use.`,
		process: function (client, msg, args) {
			let firstUser = msg.mentions.users.first().username,
					secondUser = msg.mentions.users.last().username,
					shipName = `${firstUser.substring(0, 4)}${secondUser.slice(-4)}`.toLowerCase();

			msg.channel.send(`Long live to ${shipName.charAt(0).toUpperCase() + shipName.slice(1)}! 🚢`)
									.then(msg => {
										msg.react('🚢');
									});
		}
	},
	'log': {
		desc: `Get bot's last version changelog.\nWrite \`${process.env.PREFIX}log\` to use.`,
		process: function (client, msg, args) {
			parseChangelog('./CHANGELOG.md', (err, result) => {
				if (err) throw err
				console.log(`Sent CHANGELOG with ${version} modifications.`);
				msg.channel.send(`\`\`\`md\n# ${result.title.toUpperCase()}\n\n## ${result.versions[0].title}\n\n${result.versions[0].body}\`\`\``);
			});
		}
	},
	'version': {
		desc: `Get bot version.\nWrite \`${process.env.PREFIX}version\` to use.`,
		process: function (client, msg, args) {
			msg.channel.send(`My version is \`${version}\`!`);
		}
	},
	'help': {
		desc: `Get the description of the searched command.\nWrite \`${process.env.PREFIX}help <command>\` to use.`,
		process: function (client, msg, args) {
			try {
				if(commands.hasOwnProperty(args[0])) {
					msg.channel.send(`${commands[args[0]].desc}`);
				} else {
					msg.channel.send(`${commands[aliases[args[0]]].desc}`);
				}
			} catch (e) {
				msg.channel.send('Invalid parameters!');
			}
		}
	}
};

module.exports = function(cmd, client, msg, args){
	try {
		if(commands.hasOwnProperty(cmd)) {
			commands[cmd].process(client, msg, args);
		} else {
			commands[aliases[cmd]].process(client, msg, args);
		}
	} catch(e) {
		console.log('Invalid command.');
	}
};