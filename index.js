require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const parseChangelog = require('changelog-parser');
const prefix = process.env.PREFIX;
const commands = require('./bot/commands.js');
const version = require('./package.json').version;

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag} v${version}!`);
	setActivity();
	sendLog();
});

client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === 'dm') return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	commands(cmd, client, msg, args);

});

setInterval(() => {
	setActivity();
}, 900000);

const sendLog = () => {
	parseChangelog('./CHANGELOG.md', (err, result) => {
		if (err) throw err;
		const channel = client.channels.get(`${process.env.DEFAULT_CHANNEL}`);
		channel.send(`\`\`\`md\n# ${result.title.toUpperCase()}\n\n## ${result.versions[0].title}\n\n${result.versions[0].body}\`\`\``);
	});
};

const setActivity = () => {
	const activityTypes = ['LISTENING', 'PLAYING', 'WATCHING'];
	const rndType = Math.floor(Math.random() * activityTypes.length);
	const activities = require('./bot/activities.json');
	client.user.setActivity(activities[rndType][Math.floor(Math.random() * activities[rndType].length)], { type: activityTypes[rndType] });
	console.log('Updated bot\'s activity');
};

client.login(`${process.env.TOKEN}`);