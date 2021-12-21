const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Apply a stream activity with url to bot.\nWrite \`${prefix}debugger\` to get message info.`;
  },
  process: function(client, message) {
    if (!(message.author.id === owner)) return message.reply('You don\'t have permissions to do that!');
    message.channel.send(`${message.guild.name}, ${message.guild.id}`);
    console.log(message.guild);
  },
};