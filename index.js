const Discord = require('discord.js');
const env = require('dotenv').config();
const http = require('http');
const config = require('./config/config.json');
const request = require('request');
const client = new Discord.Client();
const prefix = config.prefix;
const owner = process.env.OWNER_ID;

http.createServer((req, res) => {
	res.writeHead(200, {
			'Content-type': 'text/plain'
	});
	res.write('');
	res.end();
}).listen(4000);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if (command === 'myid') {
		msg.reply(`Your ID is ${msg.author.id}`);
	}

  if (command === 'ping') {
		msg.reply(`Your ping is **${Math.round(client.ping)} ms**!`) 
	}

	if (command === 'invitelink') {
		msg.reply(`Invite me to another server: ${config.inviteLink}`);
	}
	
	if (command === 'play') {
		if (msg.author.id === owner){
			client.user.setGame(args.join(' '));
			msg.reply(`Playing ${args.join(' ')}!`);
		} else {
			msg.reply("You don't have permissions to do that!")
		}
	}

	if (command === 'ftn') {
		request({
			method: 'GET',
			url: `https://api.fortnitetracker.com/v1/profile/${args[0]}/${args[1]}`,
			headers: {
				'TRN-Api-Key': `${process.env.API_TOKEN}`
			}
		}, function(err, res, body) {
			let userInfo = JSON.parse(body);

			switch (args[2]) {
				case 'kills':
					msg.channel.send(`${userInfo.epicUserHandle} killed ${userInfo.lifeTimeStats[10].value} players overall!`);				
					break;

				default:
					break;
			}
			
		});
	}

	if (command === 'wtt') {
		request.get(`http://api.openweathermap.org/data/2.5/weather?q=${args.join(",")}&APPID=${process.env.API_WTT}`, function(err, res, body) {
			try {
				let wttInfo = JSON.parse(body);
				msg.channel.send(`${wttInfo.name} ${Math.round(wttInfo.main.temp - 273.15)}ºC`)
			} catch(e) {
				msg.channel.send('Invalid location!');
			}
		});
	}

	if (command === 'urban') {
		request.get(`https://api.urbandictionary.com/v0/define?term=${args.join("-")}`, function(err, res, body) {
			let json = JSON.parse(body);
			msg.channel.send(`${json.list[0].definition.replace(/\[/g, '').replace(/\]/g, '')} ${json.list[0].permalink}`);
		});
	}

});

client.login(`${process.env.TOKEN}`);