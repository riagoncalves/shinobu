const owner = process.env.OWNER_ID;

module.exports = {
	desc: function(prefix) {
		return `Write \`${prefix}setnickname <user> <nickname>\` to change a user nickname.`;
	},
	process: function(client, msg, args) {
		if(msg.member.hasPermission('CHANGE_NICKNAME') || msg.member.hasPermission('MANAGE_NICKNAMES') || (msg.author.id === owner)) {
			const mentionMember = msg.mentions.members.first();
			if(!mentionMember) return msg.reply('Please mention a valid member of this server');
			const nickname = args.slice(1).join(' ');
			mentionMember.setNickname(nickname).then(user => {
				msg.reply(`${user.displayName} nickname has been changed!!`);
			}).catch((err) => {
				msg.reply(`Sorry, I couldn't change ${mentionMember.displayName} nickname because of: ${err}`);
			});
		}
		else {
			msg.reply('You don\'t have permissions to do that!');
		}
	},
};