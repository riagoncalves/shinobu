const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}ban <user> <reason>\` to ban a server member.`;
  },
  process: function(client, message, args) {
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_GUILD') || (message.author.id === owner)) {
      const mentionMember = message.mentions.members.first();
      if(!mentionMember) return message.reply('Please mention a valid member of this server');
      if(!mentionMember.bannable) return message.reply('I cannot ban this user! Do I have ban permissions?');
      let reason = args.slice(1).join(' ');
      if(!reason) reason = 'No reason provided';
      mentionMember.ban({ reason: reason }).then((member) => {
        message.channel.send(`${member.displayName} has been successfully banned!`);
      }).catch((err) => {
        message.reply(`Sorry, I couldn't ban because of: ${err}`);
      });
    }
    else {
      message.reply('You don\'t have permissions to do that!');
    }
  },
};