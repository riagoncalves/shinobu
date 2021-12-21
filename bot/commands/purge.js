const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}purge <number>\` to delete up to 100 messages.`;
  },
  process: function(client, message, args) {
    if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('MANAGE_CHANNELS') || (message.author.id === owner)) {
      const deleteCount = parseInt(args[0], 10);
      message.delete();
      if(!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');
      message.channel.bulkDelete(deleteCount);
    }
    else {
      message.reply('You don\'t have permissions to do that!');
    }
  },
};