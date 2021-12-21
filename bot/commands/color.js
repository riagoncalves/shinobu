const models = require('../../db/models');
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}color\` to see your own color and \`${prefix}color #<color_hex>\` to set a new color.`;
  },
  process: async function(client, message, args) {
    const user = await models.User.findOne({ where: { userID: message.author.id } });
    const canvas = Canvas.createCanvas(20, 20);
    const ctx = canvas.getContext('2d');

    if(args.length > 0) {
      const color = args[0];

      if(color.length > 7 || color[0] !== '#') return message.channel.send(`**${message.author.username}** your color is invalid! It needs to be with **HEX** format: **#ffffff**!`);

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const attachment = new MessageAttachment(canvas.toBuffer(), 'color.png');

      user.update({
        color: color,
      });

      return message.channel.send({ content: `**${message.author.username}** your new color is **${color}**!`, files: [attachment] });
    }
    else {
      ctx.fillStyle = user.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const attachment = new MessageAttachment(canvas.toBuffer(), 'color.png');

      return message.channel.send({ content: `**${message.author.username}** your color is **${user.color}**!`, files: [attachment] });
    }
  },
};