const models = require('../../db/models');
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {
	desc: function(prefix) {
		return `Write \`${prefix}color\` to see your own color and \`${prefix}color #<color_hex>\` to set a new color.`;
	},
	process: async function(client, msg, args) {
		const user = await models.User.findOne({ where: { userID: msg.author.id } });
		const canvas = Canvas.createCanvas(20, 20);
		const ctx = canvas.getContext('2d');

		if(args.length > 0) {
			const color = args[0];

			if(color.length > 7 || color[0] !== '#') return msg.channel.send(`**${msg.author.username}** your color is invalid! It needs to be with **HEX** format: **#ffffff**!`);

			ctx.fillStyle = color;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'color.png');

			user.update({
				color: color,
			});

			return msg.channel.send(`**${msg.author.username}** your new color is **${color}**!`, attachment);
		}
		else {
			ctx.fillStyle = user.color;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'color.png');

			return msg.channel.send(`**${msg.author.username}** your color is **${user.color}**!`, attachment);
		}
	},
};