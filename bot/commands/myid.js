module.exports = {
	desc: function(prefix) {
		return `Sends own user client ID.\nWrite \`${prefix}myid\` to use.`;
	},
	process: function(client, msg) {
		msg.reply(`Your ID is ${msg.author.id}`);
	},
};