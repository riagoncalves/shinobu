const Discord = require('discord.js'),
			http = require('http'),
			config = require('./config/config.json'),
			client = new Discord.Client(),
			prefix = config.prefix,
			commands = require('./bot/commands.js');

http.createServer((req, res) => {
	res.writeHead(200, {
			'Content-type': 'text/plain'
	});
	res.write('');
	res.end();
}).listen(4000);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	let activityTypes = ["LISTENING", "PLAYING", "WATCHING"],
			rndType = Math.floor(Math.random() * activityTypes.length),
			activities = require('./config/activities.json');

	client.user.setActivity(activities[rndType][Math.floor(Math.random() * activities[rndType].length)], { type: activityTypes[rndType] });
});

client.on('message', msg => {
	
	if (!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === 'dm') return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g),
				cmd = args.shift().toLowerCase();

	commands[cmd].process(client, msg, args);

});

setInterval(() => {
	let activityTypes = ["LISTENING", "PLAYING", "WATCHING"],
			rndType = Math.floor(Math.random() * activityTypes.length),
			activities = require('./config/activities.json');
	client.user.setActivity(activities[rndType][Math.floor(Math.random() * activities[rndType].length)], { type: activityTypes[rndType] });
	console.log( "Updated bot's activity");
}, 900000);

client.login(`${config.token}`);