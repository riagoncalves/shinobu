const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}kick <user> <reason>\` to kick a server member.`;
  },
  process: function(client, msg, args) {
    if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || (msg.author.id === owner)) {
      const mentionMember = msg.mentions.members.first();
      if(!mentionMember) return msg.reply('Please mention a valid member of this server');
      if(!mentionMember.kickable) return msg.reply('I cannot kick this user! Do I have kick permissions?');
      let reason = args.slice(1).join(' ');
      if(!reason) reason = 'No reason provided';
      mentionMember.kick(reason).then((member) => {
        msg.channel.send(`${member.displayName} has been successfully kicked!`);
      }).catch((err) => {
        msg.reply(`Sorry, I couldn't ban because of: ${err}`);
      });
    }
    else {
      msg.reply('You don\'t have permissions to do that!');
    }
  },
};