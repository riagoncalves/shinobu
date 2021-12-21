const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Switches bot's activity!\nWrite \`${prefix}activity <listening/playing/watching> <activity>\` to use.`;
  },
  process: function(client, message, args) {
    if (!(message.author.id === owner)) return message.reply('You don\'t have permissions to do that!');
    const type = args.shift();
    client.user.setActivity(args.join(' '), { type: type.toUpperCase() });

    switch (type.toLowerCase()) {
    case 'listening':
      message.reply(`I'm listening to ${args.join(' ')}!`);
      break;

    case 'playing':
      message.reply(`I'm playing ${args.join(' ')}!`);
      break;

    case 'watching':
      message.reply(`I'm watching to ${args.join(' ')}!`);
      break;
    }
  },
};