const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}setnickname <user> <nickname>\` to change a user nickname.`;
  },
  process: function(client, message, args) {
    if(message.member.hasPermission('CHANGE_NICKNAME') || message.member.hasPermission('MANAGE_NICKNAMES') || (message.author.id === owner)) {
      const mentionMember = message.mentions.members.first();
      if(!mentionMember) return message.reply('Please mention a valid member of this server');
      const nickname = args.slice(1).join(' ');
      mentionMember.setNickname(nickname).then(user => {
        message.reply(`${user.displayName} nickname has been changed!!`);
      }).catch((err) => {
        message.reply(`Sorry, I couldn't change ${mentionMember.displayName} nickname because of: ${err}`);
      });
    }
    else {
      message.reply('You don\'t have permissions to do that!');
    }
  },
};