const models = require('../../db/models');

module.exports = {
	desc: function(prefix) {
		return `\nWrite \`${prefix}bgbuy <bg_name>\` to buy a background.`;
	},
	process: async function(client, msg, args) {
		if (!args[0]) return msg.reply('You need to write the background name!');

		const name = args[0];
		const background = await models.Background.findOne({ where: { name: name } });
		const user = await models.User.findOne({ where: { userID: msg.author.id } });
		if(!background) return msg.channel.send(`There isn't a background named **${name}**!`);
		if(background.value > user.donuts) return msg.channel.send(`You need to get **${background.value - user.donuts} donuts** more in order to buy this background!`);
		const userbackground = await models.UserBackground.findOne({ where: { UserId: user.id, BackgroundId: background.id } });
		if(userbackground) return msg.channel.send(`You already have this backgroubd: **${name}**!`);
		const finalDonuts = user.donuts - background.value;

		user.update({
			donuts: finalDonuts,
		});

		models.UserBackground.create({
			UserId: user.id,
			BackgroundId: background.id,
		});

		msg.channel.send(`${msg.author.username} you just bought **${background.name}**`, { files: [background.link] });

	},
};