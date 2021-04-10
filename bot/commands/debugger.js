const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Apply a stream activity with url to bot.\nWrite \`${prefix}debugger\` to get message info.`;
  },
  process: function(client, msg) {
    if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
    msg.channel.send(`${msg.guild.name}, ${msg.guild.id}`);
    console.log(msg.guild);
  },
};