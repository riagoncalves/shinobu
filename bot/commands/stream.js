const owner = process.env.OWNER_ID;

module.exports = {
	desc: function(prefix) {
		return `Apply a stream activity with url to bot.\nWrite \`${prefix}stream <game_name> <stream_url>\` to use.`;
	},
	process: function(client, msg, args) {
		if (!(msg.author.id === owner)) return msg.reply('You don\'t have permissions to do that!');
		client.user.setActivity(args[0], { type: 'STREAMING', url: args[1] });
		msg.reply(`Streaming ${args[0]}!`);
	},
};