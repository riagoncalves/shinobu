const models = require('../../db/models');

module.exports = {
	desc: function(prefix) {
		return `Write \`${prefix}profile\` to see your own profile and \`${prefix}profile <user>\` to see other user profile.`;
	},
	process: async function(client, msg) {
		if(msg.mentions.users.first()) {
			const user = await models.User.findOne({ where: { userID: msg.mentions.users.first().id } });
			if(!user) return msg.channel.send('Invalid user!');
			return msg.channel.send(`**${msg.mentions.users.first().username}** is **level ${user.level}** and has **${user.donuts} donuts**!!`);
		}
		const user = await models.User.findOne({ where: { userID: msg.author.id } });
		msg.reply(`You are **level ${user.level}** and you have **${user.donuts} donuts**!!`);
	},
};