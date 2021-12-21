const models = require('../../db/models');

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}title\` to see your own title and \`${prefix}title <title>\` to set a new title.`;
  },
  process: async function(client, message, args) {
    const user = await models.User.findOne({ where: { userID: message.author.id } });

    if(args.length > 0) {
      const title = args.join(' ');

      if(title.length > 30) return message.channel.send(`**${message.author.username}** your title is too long, choose another one!`);

      user.update({
        title: title,
      });
      return message.channel.send(`**${message.author.username}** your new title is **${title}**!`);
    }
    else {
      return message.channel.send(`**${message.author.username}** your title is **${user.title}**!`);
    }
  },
};