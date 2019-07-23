const Discord = require('discord.js'),
			http = require('http'),
			config = require('./config/config.json'),
			client = new Discord.Client(),
			parseChangelog = require('changelog-parser'),
			prefix = config.prefix,
			commands = require('./bot/commands.js'),
			version = require('./package.json').version;

http.createServer((req, res) => {
	res.writeHead(200, {
			'Content-type': 'text/plain'
	});
	res.write('');
	res.end();
}).listen(4000);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag} v${version}!`);
	setActivity();
	sendLog();
});

client.on('message', msg => {
	
	if (!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === 'dm') return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g),
				cmd = args.shift().toLowerCase();

	commands(cmd, client, msg, args);

});

setInterval(() => {
	setActivity();
}, 900000);

let sendLog = () => {
	parseChangelog('./CHANGELOG.md', (err, result) => {
		if (err) throw err
		let channel = client.channels.get(`${config.defaultChannel}`);
		channel.send(`\`\`\`md\n# ${result.title.toUpperCase()}\n\n## ${result.versions[0].title}\n\n${result.versions[0].body}\`\`\``);
	});
};

let setActivity = () => {
	let activityTypes = ["LISTENING", "PLAYING", "WATCHING"],
		rndType = Math.floor(Math.random() * activityTypes.length),
		activities = require('./config/activities.json');
	client.user.setActivity(activities[rndType][Math.floor(Math.random() * activities[rndType].length)], { type: activityTypes[rndType] });
	console.log("Updated bot's activity");
};

client.login(`${config.token}`);