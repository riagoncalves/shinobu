const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}mute <user>\` to mute temporarly a user.`;
  },
  process: async function(client, message) {
    if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('MANAGE_CHANNELS') || (message.author.id === owner)) {
      const mentionMember = message.mentions.members.first();
      if(!mentionMember) return message.reply('Please mention a valid member of this server');
      if(mentionMember.hasPermission('MANAGE_MESSAGES')) return message.reply('I cannot mute this user!');
      let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted 🔇');
      if(!muteRole) {
        try {
          muteRole = await message.guild.roles.create({
            data: {
              name: 'Muted 🔇',
              color: '#d49100',
              permissions: [],
            },
          });
          message.guild.channels.cache.forEach(async (channel) => {
            await channel.updateOverwrite(muteRole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
            });
          });
        }
        catch (err) {
          message.reply(`Sorry, I couldn't mute because of: ${err}`);
        }
      }
      await (mentionMember.roles.add(muteRole.id));
      message.reply(`${mentionMember.displayName} has been muted!!🔇`);
    }
    else {
      message.reply('You don\'t have permissions to do that!');
    }
  },
};