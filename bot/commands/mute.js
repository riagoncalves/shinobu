const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}mute <user>\` to mute temporarly a user.`;
  },
  process: async function(client, msg) {
    if(msg.member.hasPermission('ADMINISTRATOR') || msg.member.hasPermission('MANAGE_GUILD') || msg.member.hasPermission('MANAGE_MESSAGES') || msg.member.hasPermission('MANAGE_CHANNELS') || (msg.author.id === owner)) {
      const mentionMember = msg.mentions.members.first();
      if(!mentionMember) return msg.reply('Please mention a valid member of this server');
      if(mentionMember.hasPermission('MANAGE_MESSAGES')) return msg.reply('I cannot mute this user!');
      let muteRole = msg.guild.roles.cache.find(role => role.name === 'Muted 🔇');
      if(!muteRole) {
        try {
          muteRole = await msg.guild.roles.create({
            data: {
              name: 'Muted 🔇',
              color: '#d49100',
              permissions: [],
            },
          });
          msg.guild.channels.cache.forEach(async (channel) => {
            await channel.updateOverwrite(muteRole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
            });
          });
        }
        catch (err) {
          msg.reply(`Sorry, I couldn't mute because of: ${err}`);
        }
      }
      await (mentionMember.roles.add(muteRole.id));
      msg.reply(`${mentionMember.displayName} has been muted!!🔇`);
    }
    else {
      msg.reply('You don\'t have permissions to do that!');
    }
  },
};