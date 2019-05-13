const Discord = require('discord.js');
const http = require('http');
const config = require('./config/config.json');
const XMLHttpRequest = require('node-http-xhr');
const client = new Discord.Client();
const prefix = config.prefix;
const owner = config.ownerId;

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
		let xhttp = new XMLHttpRequest();
		let udi;
		
		xhttp.open("GET", `https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=${args[0]}`, true);
		
		xhttp.addEventListener('load', function () {
			uid = `${JSON.parse(this.responseText).uid}`;
			msg.reply(uid);
		});

		xhttp.send();
	}

});

client.login(`${config.token}`);