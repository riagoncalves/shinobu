const models = require('../../db/models');

module.exports = {
	async init(guild) {
		const deletedGuild = await models.Guild.findOne({ where: { guildID: guild.id } });
		deletedGuild.destroy();
	},
};