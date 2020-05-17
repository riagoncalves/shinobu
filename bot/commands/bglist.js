const models = require('../../db/models');
const Discord = require('discord.js');

module.exports = {
	desc: function(prefix) {
		return `\nWrite \`${prefix}bglist\` to list all available backgrounds to buy.`;
	},
	process: async function(client, msg, args, prefix) {
		const backgrounds = await models.Background.findAll();
		const backgroundsList = [];
		backgrounds.forEach(background => {
			backgroundsList.push({
				name: `\`${background.dataValues.name}\``,
				value: `${background.dataValues.value} donuts 🍩`,
			});
		});

		const richEmbed = new Discord.MessageEmbed()
			.setColor('#d49100')
			.setTitle('🖼️ Backgrounds')
			.setDescription('All available backgrounds to buy!')
			.addFields(backgroundsList)
			.addField('\u200B', `Write \`${prefix}bg <bg_name>\` to see a single background!`)
			.setFooter(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.avatarURL()}`);

		msg.channel.send(richEmbed);
	},
};