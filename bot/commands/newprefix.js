const fs = require('fs');
const models = require('../../db/models');
const owner = process.env.OWNER_ID;

module.exports = {
	desc: function(prefix) {
		return `Set new prefix for your server.\nWrite \`${prefix}newprefix\` to use.`;
	},
	process: async function(client, msg, args) {
		if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || (msg.author.id === owner)) {
			const server = await models.Guild.findOne({ where: { guildID: msg.channel.guild.id } });
			server.update({ prefix: args[0] });

			const prefixesFile = await JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));
			prefixesFile[server.guildID] = {
				prefix: args[0],
			};
			fs.writeFile('./data/prefixes.json', JSON.stringify(prefixesFile), () => {
				console.log('Updating prefixes.json!');
			});
			msg.channel.send(`Your server new prefix is \`${args[0]}\`!`);
		}
		else {
			msg.reply('You don\'t have permissions to do that!');
		}
	},
};