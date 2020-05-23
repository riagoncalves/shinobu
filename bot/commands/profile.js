const models = require('../../db/models');
const Canvas = require('canvas');
const Discord = require('discord.js');

const functions = {
	numFormatter(num) {
		return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
	},
	async profileImage(user) {
		const username = user.username.split('#')[0];
		const donuts = this.numFormatter(user.donuts);
		const canvas = Canvas.createCanvas(800, 568);
		const ctx = canvas.getContext('2d');

		if (user.BackgroundId) {
			// Cover
			const image = await models.UserBackground.findOne({ where: { id: user.BackgroundId }, include: ['Background'] });
			const link = image.Background.dataValues.link;
			const background = await Canvas.loadImage(link);
			ctx.drawImage(background, 0, -70, canvas.width, canvas.width * background.height / background.width);
		}
		else {
			ctx.fillStyle = user.color;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

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

		// Donuts Number
		ctx.font = 'bold 30px Arial';
		ctx.fillStyle = '#000000';
		const donutsnumWidth = ctx.measureText(donuts).width;
		ctx.fillText(donuts, (1297 / 2) - (donutsnumWidth / 2), ((30 * 1.5) / 2) + 289);

		// Donuts Label
		ctx.font = '15px Verdana';
		ctx.fillStyle = '#000000';
		const donutsLabel = 'Donuts';
		const donutslblWidth = ctx.measureText(donutsLabel).width;
		ctx.fillText(donutsLabel, (1297 / 2) - (donutslblWidth / 2), ((15 * 1.5) / 2) + 328);

		// Level Label
		ctx.font = '15px Verdana';
		ctx.fillStyle = '#000000';
		const levelLabel = 'Level';
		ctx.fillText(levelLabel, 79, ((15 * 1.5) / 2) + 451);

		// Level Num
		ctx.font = 'bold 30px Arial';
		ctx.fillStyle = '#000000';
		ctx.fillText(user.level, 122, ((30 * 1.5) / 2) + 440);

		// Experience Value
		ctx.font = 'bold 15px Arial';
		ctx.fillStyle = '#000000';
		ctx.fillText(user.experience, 635, ((15 * 1.5) / 2) + 450);

		// Experience Limit
		ctx.font = '15px Arial';
		ctx.fillStyle = '#7a7a7a';
		const finalExp = user.level * 100;
		const experienceLimitLabel = ` / ${finalExp}`;
		const expWidth = ctx.measureText(user.experience).width;
		ctx.fillText(experienceLimitLabel, 635 + expWidth, ((15 * 1.5) / 2) + 450);

		// Exp Limit Bar
		const expLimitBar = await Canvas.loadImage('https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/level-limit.png');
		ctx.drawImage(expLimitBar, 71, 470, 657, 34);

		// ExpBar
		const expBar = await Canvas.loadImage('https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/exp.png');
		const percentageExp = user.experience / finalExp;
		ctx.drawImage(expBar, 71, 470, 657 * percentageExp, 34);

		// Profile Picture
		ctx.beginPath();
		ctx.arc(400, 247, 95, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		const photo = user.photo ? user.photo : 'https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/default-pfp.jpg';
		const avatar = await Canvas.loadImage(photo);
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
			const attachment = await functions.profileImage(user);
			return msg.channel.send(attachment);
		}
		const user = await models.User.findOne({ where: { userID: msg.author.id } });

		const attachment = await functions.profileImage(user);

		msg.channel.send(attachment);
	},
};