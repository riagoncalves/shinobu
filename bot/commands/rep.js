const models = require('../../db/models');

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}rep\` to give reputation to other members.`;
  },
  process: async function(client, message) {
    const user = await models.User.findOne({ where: { userID: message.author.id } });
    const mentionedUser = await models.User.findOne({ where: { userID: message.mentions.users.first().id } });
    if(!mentionedUser) return message.channel.send('Invalid user!');
    const hourDiff = Math.abs(user.repCheck.getTime() - new Date(Date.now()).getTime()) / 1000 / 60 / 60;

    if(hourDiff >= 5) {
      const rep = mentionedUser.rep + 1;

      user.update({
        repCheck: new Date(Date.now()),
      });

      mentionedUser.update({
        rep: rep,
      });

      message.channel.send(`**${message.author.username}** has added **+1 Rep** to **${message.mentions.users.first().username}**!`);
    }
    else {
      message.reply(`It seems you already gave rep to someone, you can give it again in: **${5 - Math.round(hourDiff)} hours**`);
    }
  },
};