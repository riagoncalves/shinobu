const owner = process.env.OWNER_ID;
const models = require('../../db/models');
const Discord = require('discord.js');

module.exports = {
	desc: function(prefix) {
		const richEmbed = new Discord.MessageEmbed()
			.setColor('#d49100')
			.setTitle('🖼️ Background Commands')
			.setDescription('Commands List!')
			.addFields([
				{
					name: `\`${prefix}bg list <bg_name>\``,
					value: 'List all available backgrounds!',
				},
				{
					name: `\`${prefix}bg show <bg_name>\``,
					value: 'See a single background!',
				},
				{
					name: `\`${prefix}bg buy <bg_name>\``,
					value: 'Buy a background!',
				},
				{
					name: `\`${prefix}bg select <bg_name>\``,
					value: 'Set this background as your cover!',
				},
			]);
		return richEmbed;
	},
	process: async function(client, msg, args, prefix) {
		const command = args.shift();

		switch(command) {
		case 'create': {
			if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
			if (args.length != 3) return msg.reply('Invalid arguments number!');

			const name = args[0];
			const link = args[1];
			const value = parseInt(args[2]);

			if (name.length > 30) return msg.reply('Background name is too big! Choose another one.');

			try {
				new URL(link);
			}
			catch (err) {
				return msg.reply('Background link isn\'t valid!');
			}

			if (isNaN(value)) return msg.reply('Background value isn\'t valid!');

			models.Background.create({
				name: name,
				link: link,
				value: value,
			});

			msg.channel.send('Background registered', { files: [link] });
			break;
		}

		case 'delete': {
			if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');

			const name = args[0];

			const background = await models.Background.findOne({ where: { name: name } });
			if (!background) return msg.channel.send(`There isn't a background named **${name}**!`);

			background.destroy().then(() => {
				msg.channel.send(`Background **${name}** deleted!`);
			});

			break;
		}

		case 'show': {
			if (args.length < 1) return msg.channel.send('You need to write the background name!');
			const name = args[0];
			const background = await models.Background.findOne({ where: { name: name } });
			if (!background) return msg.channel.send(`There isn't a background named **${name}**!`);
			const user = await models.User.findOne({ where: { userID: msg.author.id } });
			const userbackground = await models.UserBackground.findOne({ where: { UserId: user.id, BackgroundId: background.id } });
			const copy = userbackground ? '' : `Write \`${prefix}bg buy ${background.name}\` to buy this background for **${background.value} donuts** 🍩!`;
			msg.channel.send(copy, { files: [background.link] });
			break;
		}

		case 'buy': {
			if (!args[0]) return msg.reply('You need to write the background name!');

			const name = args[0];
			const background = await models.Background.findOne({ where: { name: name } });
			const user = await models.User.findOne({ where: { userID: msg.author.id } });
			if (!background) return msg.channel.send(`There isn't a background named **${name}**!`);
			if (background.value > user.donuts) return msg.channel.send(`You need to get **${background.value - user.donuts} donuts** more in order to buy this background!`);
			const userbackground = await models.UserBackground.findOne({ where: { UserId: user.id, BackgroundId: background.id } });
			if (userbackground) return msg.channel.send(`You already have this backgroubd: **${name}**!`);
			const finalDonuts = user.donuts - background.value;

			user.update({
				donuts: finalDonuts,
			});

			models.UserBackground.create({
				UserId: user.id,
				BackgroundId: background.id,
			});

			msg.channel.send(`${msg.author.username} you just bought **${background.name}**`, { files: [background.link] });
			break;
		}

		case 'list': {
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
				.addField('\u200B', `Write \`${prefix}bg show <bg_name>\` to see a single background!`)
				.setFooter(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.avatarURL()}`);

			msg.channel.send(richEmbed);
			break;
		}

		case 'select': {
			if (!args[0]) return msg.reply('You need to write the background name!');
			const name = args[0];
			const user = await models.User.findOne({ where: { userID: msg.author.id } });
			const userbackground = await models.UserBackground.findOne({ where: { UserId: user.id }, include: [ { model: models.Background, as: 'Background', where: { name: name } }] });

			if (!userbackground) return msg.reply('You don\'t have this background or this background doesn\'t exist!');

			user.update({
				BackgroundId: userbackground.dataValues.id,
			});

			msg.channel.send(`${msg.author.username} you just selected **${name}** as your background!`, { files: [userbackground.dataValues.Background.dataValues.link] });

			break;
		}

		default: {
			const richEmbed = new Discord.MessageEmbed()
				.setColor('#d49100')
				.setTitle('🖼️ Background Commands')
				.setDescription('Commands List!')
				.addFields([
					{
						name: `\`${prefix}bg list <bg_name>\``,
						value: 'List all available backgrounds!',
					},
					{
						name: `\`${prefix}bg show <bg_name>\``,
						value: 'See a single background!',
					},
					{
						name: `\`${prefix}bg buy <bg_name>\``,
						value: 'Buy a background!',
					},
				])
				.setFooter(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.avatarURL()}`);

			msg.channel.send(richEmbed);
		}
		}
	},
};