module.exports = {
  desc: function(prefix) {
    return `Sends bot's invite link.\nWrite \`${prefix}invitelink\` to use.`;
  },
  process: function(client, message) {
    message.reply(`Invite me to another server: ${process.env.INVITE_LINK}`);
  },
};