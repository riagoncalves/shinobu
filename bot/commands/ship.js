module.exports = {
	desc: function(prefix) {
		return `Ship a couple.\nWrite \`${prefix}ship <user1> <user2>\` to use.`;
	},
	process: function(client, msg) {
		const firstUser = msg.mentions.users.first().username;
		const secondUser = msg.mentions.users.last().username;
		const shipName = `${firstUser.substring(0, 4)}${secondUser.slice(-4)}`.toLowerCase();

		msg.channel.send(`Long live to ${shipName.charAt(0).toUpperCase() + shipName.slice(1)}! 🚢`)
			.then((botMsg) => {
				botMsg.react('🚢');
			});
	},
};