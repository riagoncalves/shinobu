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
		request.get(`https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${args[0]}`, function(err, res, body) {  
			let userInfo = JSON.parse(body);

			switch (args[1]) {
				case 'kills':
					request.get(`https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=${userInfo.uid}`, function(err, res, body) {  
						let userStatus = JSON.parse(body);
						let killsNum = `${userStatus.overallData.defaultModes.kills + userStatus.overallData.ltmModes.kills}`;
						msg.channel.send(`${userInfo.username} killed ${killsNum} players overall!`);
					});					
					break;

				default:
					break;
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