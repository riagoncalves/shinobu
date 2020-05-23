const models = require('../../db/models');
const Canvas = require('canvas');
const Discord = require('discord.js');

const functions = {
	async profileImage(user) {
		const image = await models.UserBackground.findOne({ where: { id: user.BackgroundId }, include: ['Background'] });
		const link = image.Background.dataValues.link;
		const username = user.username.split('#')[0];
		const canvas = Canvas.createCanvas(800, 568);
		const ctx = canvas.getContext('2d');

		// Cover
		const background = await Canvas.loadImage(link);
		ctx.drawImage(background, 0, -70, canvas.width, canvas.width * background.height / background.width);

		// Custom Color Background
		ctx.fillStyle = user.color;
		ctx.fillRect(0, 252, canvas.width, 316);

		// White Text Background
		const textBg = await Canvas.loadImage('https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/text-bg.png');
		ctx.drawImage(textBg, 18, 266, 762, 281);

		// Username
		ctx.font = 'bold 30px Arial';
		ctx.fillStyle = '#000000';
		const usernameWidth = ctx.measureText(username).width;
		ctx.fillText(username, (canvas.width / 2) - (usernameWidth / 2), ((30 * 1.5) / 2) + 356);

		// Title
		ctx.font = '20px Verdana';
		ctx.fillStyle = '#000000';
		const titleWidth = ctx.measureText(user.title).width;
		ctx.fillText(user.title, (canvas.width / 2) - (titleWidth / 2), ((20 * 1.5) / 2) + 401);

		// Rep Number
		ctx.font = 'bold 30px Arial';
		ctx.fillStyle = '#000000';
		const repnumWidth = ctx.measureText(user.rep).width;
		ctx.fillText(user.rep, (306 / 2) - (repnumWidth / 2), ((30 * 1.5) / 2) + 289);

		// Rep Label
		ctx.font = '15px Verdana';
		ctx.fillStyle = '#000000';
		const repLabel = 'Reputation';
		const replblWidth = ctx.measureText(repLabel).width;
		ctx.fillText(repLabel, (306 / 2) - (replblWidth / 2), ((15 * 1.5) / 2) + 328);

		// Profile Picture
		ctx.beginPath();
		ctx.arc(400, 247, 97, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		const avatar = await Canvas.loadImage(user.photo);
		ctx.drawImage(avatar, 303, 152, 194, 194);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');
		return attachment;
	},
};

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

		const attachment = await functions.profileImage(user);

		msg.reply(`You are **level ${user.level}** and you have **${user.donuts} donuts**!!`, attachment);
	},
};