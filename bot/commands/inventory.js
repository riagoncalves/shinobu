const models = require('../../db/models');
const Discord = require('discord.js');

module.exports = {
  desc: function(prefix) {
    return `\nWrite \`${prefix}inventory\` to list all user items.`;
  },
  process: async function(client, msg, args, prefix) {
    const user = await models.User.findOne({ where: { userID: msg.author.id } });
    const userbackgrounds = await models.UserBackground.findAll(({ where: { UserId: user.id }, include: ['Background'] }));
    const backgroundsList = [];
    userbackgrounds.forEach(background => {
      backgroundsList.push({
        name: `\`${background.dataValues.Background.dataValues.name}\``,
        value: `Type \`${prefix}bg show ${background.dataValues.Background.dataValues.name}\` to preview!`,
      });
    });

    const richEmbed = new Discord.MessageEmbed()
      .setColor('#d49100')
      .setTitle('📦 Inventory')
      .addField('Your items!', '**Backgrounds**')
      .addFields(backgroundsList)
      .setFooter(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.avatarURL()}`);

    msg.channel.send(richEmbed);
  },
};