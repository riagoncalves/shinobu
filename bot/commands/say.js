module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}say <what you want>\` to make the bot say what you want.`;
  },
  process: function(client, msg, args) {
    msg.delete();
    msg.channel.send(args.join(' '));
  },
};