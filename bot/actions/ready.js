const client = require('../client.js');
const models = require('../../db/models');
const version = require('../../package.json').version;
const fs = require('fs');
// const parseChangelog = require('changelog-parser');

const functions = {
	setActivity(bot) {
		const activityTypes = ['LISTENING', 'PLAYING', 'WATCHING'];
		const rndType = Math.floor(Math.random() * activityTypes.length);
		const activities = require('../activities.json');
		bot.user.setActivity(activities[rndType][Math.floor(Math.random() * activities[rndType].length)], { type: activityTypes[rndType] });
		console.log('Updated bot\'s activity');
	},
	async guildsChecker(bot) {
		bot.shard.fetchClientValues('guilds.cache').then(results => {
			results.forEach(result => {
				result.forEach(async guild => {
					if(await models.Guild.findOne({ where: { guildID: guild.id } })) {
						console.log(`${guild.name} exists!`);
					}
					else {
						const owner = await models.User.findOne({ where: { userID: guild.ownerID } });
						models.Guild.create({
							guildID: guild.id,
							guildName: guild.name,
							banner: guild.iconURL,
							ownerID: guild.ownerID,
							ownerName: owner.username || null,
							prefix: process.env.DEFAULT_PREFIX,
						});
						console.log(`Creating ${guild.name}!`);
					}
				});
			});
		});
	},
	async prefixesJson() {
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
	},
	/* sendLog(bot) {
		parseChangelog('./CHANGELOG.md', (err, result) => {
			if (err) throw err;
			const channel = bot.channels.cache.get(`${process.env.DEFAULT_CHANNEL}`);
			channel.send(`\`\`\`md\n# ${result.title.toUpperCase()}\n\n## ${result.versions[0].title}\n\n${result.versions[0].body}\`\`\``);
		});
	}, */
};

module.exports = {
	setActivity: functions.setActivity,
	init() {
		console.log(`Logged in as ${client.user.tag} v${version}!`);

		models.sequelize.sync().then(() => {
			console.log('Database connected..');
		}).catch((err) => {
			console.log(`Error: ${err}`);
		});

		functions.setActivity(client);
		// functions.sendLog(client);
		functions.guildsChecker(client);

		setTimeout(() => {
			functions.prefixesJson();
		}, 500);
	},
};