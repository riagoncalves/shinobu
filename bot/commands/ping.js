module.exports = {
  desc: function(prefix) {
    return `Sends bot's ping.\nWrite \`${prefix}ping\` to use.`;
  },
  process: function(client, message) {
    message.reply(`My ping is **${Math.round(Date.now() - message.createdTimestamp)} ms**!`);
  },
};