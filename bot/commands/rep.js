const models = require('../../db/models');

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}rep\` to give reputation to other members.`;
  },
  process: async function(client, msg) {
    const user = await models.User.findOne({ where: { userID: msg.author.id } });
    const mentionedUser = await models.User.findOne({ where: { userID: msg.mentions.users.first().id } });
    if(!mentionedUser) return msg.channel.send('Invalid user!');
    const hourDiff = Math.abs(user.repCheck.getTime() - new Date(Date.now()).getTime()) / 1000 / 60 / 60;

    if(hourDiff >= 5) {
      const rep = mentionedUser.rep + 1;

      user.update({
        repCheck: new Date(Date.now()),
      });

      mentionedUser.update({
        rep: rep,
      });

      msg.channel.send(`**${msg.author.username}** has added **+1 Rep** to **${msg.mentions.users.first().username}**!`);
    }
    else {
      msg.reply(`It seems you already gave rep to someone, you can give it again in: **${5 - Math.round(hourDiff)} hours**`);
    }
  },
};