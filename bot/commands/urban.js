const fetch = require('node-fetch');

module.exports = {
	desc: function(prefix) {
		return `Sends search urban dictionary description and url.\nWrite \`${prefix}urban <search>\` to use.`;
	},
	process: function(client, msg, args) {
		fetch(`https://api.urbandictionary.com/v0/define?term=${args.join('-')}`).then(res => res.json())
			.then(json => {
				msg.channel.send(`${json.list[0].definition.replace(/\[/g, '').replace(/\]/g, '')} ${json.list[0].permalink}`);
			});
	},
};