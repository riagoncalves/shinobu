const models = require('../../db/models');
const { MessageEmbed } = require('discord.js');

module.exports = {
  desc: function(prefix) {
    return `\nWrite \`${prefix}inventory\` to list all user items.`;
  },
  process: async function(client, message, args, prefix) {
    const user = await models.User.findOne({ where: { userID: message.author.id } });
    const userbackgrounds = await models.UserBackground.findAll(({ where: { UserId: user.id }, include: ['Background'] }));
    const backgroundsList = [];
    userbackgrounds.forEach(background => {
      backgroundsList.push({
        name: `\`${background.dataValues.Background.dataValues.name}\``,
        value: `Type \`${prefix}bg show ${background.dataValues.Background.dataValues.name}\` to preview!`,
      });
    });

    const richEmbed = new MessageEmbed()
      .setColor('#d49100')
      .setTitle('📦 Inventory')
      .addField('Your items!', '**Backgrounds**')
      .addFields(backgroundsList)
      .setFooter(`${message.author.username}#${message.author.discriminator}`, `${message.author.avatarURL()}`);

    message.channel.send({ embeds: [richEmbed] });
  },
};