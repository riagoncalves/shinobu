const owner = process.env.OWNER_ID;
const models = require('../../db/models');

module.exports = {
	desc: function(prefix) {
		return `\nWrite \`${prefix}bgcreate <bg_name> <link> <value>\` to register a background to database.`;
	},
	process: function(client, msg, args) {
		if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
		if (args.length < 3) return msg.reply('There are arguments missing.');

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
	},
};