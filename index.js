require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const parseChangelog = require('changelog-parser');
const commands = require('./bot/commands.js');
const version = require('./package.json').version;
const models = require('./db/models');

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag} v${version}!`);

	models.sequelize.sync().then(function() {
		console.log('Database connected..');
	}).catch(function(err) {
		console.log(`Error: ${err}`);
	});

	setActivity();
	sendLog();
	guildsChecker();
});

client.on('message', async msg => {

	if (msg.author.bot) return;
	if (msg.channel.type === 'dm') return;

	const server = await models.Guild.findOne({ where: { guildID: msg.channel.guild.id } });
	if (!msg.content.startsWith(server.prefix)) return;

	const args = msg.content.slice(server.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	commands(cmd, client, msg, args, server.prefix);
	userChecker(msg.author);
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

const guildsChecker = () => {
	client.guilds.forEach(async guild => {
		if(await models.Guild.findOne({ where: { guildID: guild.id } })) {
			console.log(`${guild.name} exists!`);
		}
		else {
			models.Guild.create({
				guildID: guild.id,
				guildName: guild.name,
				banner: guild.iconURL,
				ownerID: guild.ownerID,
				ownerName:`${guild.owner.user.username}#${guild.owner.user.discriminator}`,
				prefix: process.env.DEFAULT_PREFIX,
			});
			console.log(`Creating ${guild.name}!`);
		}
	});
};

const userChecker = async (user) => {
	if (await models.User.findOne({ where: { userID: user.id } })) {
		console.log(`${user.username}#${user.discriminator} exists!`);
	}
	else {
		models.User.create({
			userID: user.id,
			username: `${user.username}#${user.discriminator}`,
			photo: user.avatarURL,
		});
		console.log(`Creating ${user.username}#${user.discriminator}!`);
	}
};

client.on('guildCreate', function(guild) {
	models.Guild.create({
		guildID: guild.id,
		guildName: guild.name,
		banner: guild.iconURL,
		ownerID: guild.ownerID,
		ownerName:`${guild.owner.user.username}#${guild.owner.user.discriminator}`,
		prefix: process.env.DEFAULT_PREFIX,
	});
});

client.on('guildUpdate', async function(oldGuild, newGuild) {
	const guild = await models.Guild.findOne({ where: { guildID: oldGuild.id } });
	guild.update({
		guildID: newGuild.id,
		guildName: newGuild.name,
		banner: newGuild.iconURL,
		ownerID: newGuild.ownerID,
		ownerName: `${newGuild.owner.user.username}#${newGuild.owner.user.discriminator}`,
	});
});

client.on('guildDelete', async function(guild) {
	const deletedGuild = await models.Guild.findOne({ where: { guildID: guild.id } });
	deletedGuild.destroy();
});

client.login(`${process.env.TOKEN}`);