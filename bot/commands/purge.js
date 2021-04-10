const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}purge <number>\` to delete up to 100 messages.`;
  },
  process: function(client, msg, args) {
    if(msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || msg.member.hasPermission('MANAGE_MESSAGES') || msg.member.hasPermission('MANAGE_CHANNELS') || (msg.author.id === owner)) {
      const deleteCount = parseInt(args[0], 10);
      msg.delete();
      if(!deleteCount || deleteCount < 2 || deleteCount > 100) return msg.reply('Please provide a number between 2 and 100 for the number of messages to delete');
      msg.channel.bulkDelete(deleteCount);
    }
    else {
      msg.reply('You don\'t have permissions to do that!');
    }
  },
};