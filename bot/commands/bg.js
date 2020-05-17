const models = require('../../db/models');

module.exports = {
	desc: function(prefix) {
		return `\nWrite \`${prefix}bg <bg_name>\` to see a single background.`;
	},
	process: async function(client, msg, args) {
		if (args.length < 1) return msg.channel.send('You need to write the background name!');

		const name = args[0];
		const background = await models.Background.findOne({ where: { name: name } });

		if(!background) return msg.channel.send(`There isn't a background named **${name}**!`);

		msg.channel.send({ files: [background.link] });
	},
};