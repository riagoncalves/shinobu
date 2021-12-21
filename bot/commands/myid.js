module.exports = {
  desc: function(prefix) {
    return `Sends own user client ID.\nWrite \`${prefix}myid\` to use.`;
  },
  process: function(client, message) {
    message.reply(`Your ID is ${message.author.id}`);
  },
};