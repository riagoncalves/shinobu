const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Switches bot's activity!\nWrite \`${prefix}activity <listening/playing/watching> <activity>\` to use.`;
  },
  process: function(client, msg, args) {
    if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
    const type = args.shift();
    client.user.setActivity(args.join(' '), { type: type.toUpperCase() });

    switch (type.toLowerCase()) {
    case 'listening':
      msg.reply(`I'm listening to ${args.join(' ')}!`);
      break;

    case 'playing':
      msg.reply(`I'm playing ${args.join(' ')}!`);
      break;

    case 'watching':
      msg.reply(`I'm watching to ${args.join(' ')}!`);
      break;
    }
  },
};