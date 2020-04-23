require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const parseChangelog = require('changelog-parser');
const commands = require('./bot/commands.js');
const version = require('./package.json').version;
const models = require('./db/models');
const fs = require('fs');
const messageExperience = 2;

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag} v${version}!`);

	models.sequelize.sync().then(() => {
		console.log('Database connected..');
	}).catch((err) => {
		console.log(`Error: ${err}`);
	});

	setActivity();
	sendLog();
	guildsChecker();

	setTimeout(() => {
		prefixesJson();
	}, 500);
});

client.on('message', async msg => {

	if (msg.author.bot) return;
	if (msg.channel.type === 'dm') return;

	userChecker(msg.author, msg);

	const prefixesFile = JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));
	const prefix = prefixesFile[msg.guild.id].prefix;

	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	commands(cmd, client, msg, args, prefix);
});

setInterval(() => {
	setActivity();
}, 900000);

const sendLog = () => {
	parseChangelog('./CHANGELOG.md', (err, result) => {
		if (err) throw err;
		const channel = client.channels.cache.get(`${process.env.DEFAULT_CHANNEL}`);
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
	client.guilds.cache.forEach(async guild => {
		if(await models.Guild.findOne({ where: { guildID: guild.id } })) {
			console.log(`${guild.name} exists!`);
		}
		else {
			models.Guild.create({
				guildID: guild.id,
				guildName: guild.name,
				banner: guild.iconURL(),
				ownerID: guild.ownerID,
				ownerName:`${guild.owner.user.username}#${guild.owner.user.discriminator}`,
				prefix: process.env.DEFAULT_PREFIX,
			});
			console.log(`Creating ${guild.name}!`);
		}
	});
};

const userChecker = async (user, msg) => {
	const savedUser = await models.User.findOne({ where: { userID: user.id } })
	if (savedUser) {
		console.log(`${user.username}#${user.discriminator} exists!`);
		giveExp(savedUser, msg);
	}
	else {
		models.User.create({
			userID: user.id,
			username: `${user.username}#${user.discriminator}`,
			photo: user.avatarURL(),
		});
		console.log(`Creating ${user.username}#${user.discriminator}!`);
	}
};

const giveExp = async (user, msg) => {
	const finalExp = user.experience + messageExperience;
	const level = user.level + 1 < finalExp ** (1 / 4) ? user.level + 1 : user.level;

	if (level > user.level) {
		msg.reply(`You reached level ${level}! Congratulations!!`);
	}

	user.update({
		experience: finalExp,
		level: level,
	});
};

const prefixesJson = async () => {
	fs.unlink('./data/prefixes.json', () => {
		console.log('Deleting prefixes.json!');
	});

	const prefixes = {};
	const guilds = await models.Guild.findAll({});

	guilds.forEach(guild => {
		prefixes[guild.guildID] = {
			prefix: guild.prefix,
		};
	});

	fs.writeFile('./data/prefixes.json', JSON.stringify(prefixes), () => {
		console.log('Creating prefixes.json!');
	});
};

client.on('guildCreate', (guild) => {
	models.Guild.create({
		guildID: guild.id,
		guildName: guild.name,
		banner: guild.iconURL(),
		ownerID: guild.ownerID,
		ownerName:`${guild.owner.user.username}#${guild.owner.user.discriminator}`,
		prefix: process.env.DEFAULT_PREFIX,
	});

	const prefixesFile = JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));
	prefixesFile[guild.id] = {
		prefix: process.env.DEFAULT_PREFIX,
	};
	fs.writeFile('./data/prefixes.json', JSON.stringify(prefixesFile), () => {
		console.log('Updating prefixes.json!');
	});
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
	const guild = await models.Guild.findOne({ where: { guildID: oldGuild.id } });
	guild.update({
		guildName: newGuild.name,
		banner: newGuild.iconURL(),
		ownerID: newGuild.ownerID,
		ownerName: `${newGuild.owner.user.username}#${newGuild.owner.user.discriminator}`,
	});
});

client.on('guildDelete', async (guild) => {
	const deletedGuild = await models.Guild.findOne({ where: { guildID: guild.id } });
	deletedGuild.destroy();
});

client.login(`${process.env.TOKEN}`);