const fetch = require('node-fetch');

module.exports = {
	desc: function(prefix) {
		return `Gets searched user fortnite status!\nWrite \`${prefix}ftn <pc/psn/xb1> <player_name>\` to use.`;
	},
	process: function(client, msg, args) {
		if (args[0] != 'pc' && args[0] != 'psn' && args[0] != 'xb1') {
			msg.channel.send('Invalid parameters!');
			return;
		}

		fetch(`https://api.fortnitetracker.com/v1/profile/${args[0]}/${(args.slice(1)).join('%20')}`, {
			method: 'GET',
			headers: {
				'TRN-Api-Key': `${process.env.API_FTN}`,
			},
		}).then(res => res.json())
			.then(userInfo => {
				try {
					msg.channel.send(`${userInfo.epicUserHandle} killed ${userInfo.lifeTimeStats[10].value} players overall!`);
				}
				catch (e) {
					msg.channel.send(userInfo.error);
				}
			});
	},
};