const models = require('../../db/models');

module.exports = {
  async init(oldGuild, newGuild) {
    const guild = await models.Guild.findOne({ where: { guildID: oldGuild.id } });
    guild.update({
      guildName: newGuild.name,
      banner: newGuild.iconURL({ size: 512, format: 'png' }),
      ownerID: newGuild.ownerId,
      ownerName: `${newGuild.owner.user.username}#${newGuild.owner.user.discriminator}`,
    });
  },
};