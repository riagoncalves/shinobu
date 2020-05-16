module.exports = {
	desc: function(prefix) {
		return `Sends bot's ping.\nWrite \`${prefix}ping\` to use.`;
	},
	process: function(client, msg) {
		msg.reply(`My ping is **${Math.round(Date.now() - msg.createdTimestamp)} ms**!`);
	},
};