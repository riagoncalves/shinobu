const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Apply a stream activity with url to bot.\nWrite \`${prefix}stream <game_name> <stream_url>\` to use.`;
  },
  process: function(client, message, args) {
    if (!(message.author.id === owner)) return message.reply('You don\'t have permissions to do that!');
    client.user.setActivity(args[0], { type: 'STREAMING', url: args[1] });
    message.reply(`Streaming ${args[0]}!`);
  },
};