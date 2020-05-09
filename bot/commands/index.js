const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const commands = {};

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const fileName = file.substring(0, file.length - 3);
		commands[fileName] = require(path.join(__dirname, file));
	});

commands['help'] = {
	desc: function(prefix) {
		return `Get the description of the searched command.\nWrite \`${prefix}help <command>\` to use.`;
	},
	process: function(client, msg, args, prefix) {
		try {
			if(commands.hasOwnProperty(args[0])) {
				msg.channel.send(`${commands[args[0]].desc(prefix)}`);
			}
			else {
				msg.channel.send(`${commands[aliases[args[0]]].desc(prefix)}`);
			}
		}
		catch (e) {
			msg.channel.send('Invalid parameters!');
		}
	},
};

const aliases = {
	'id': 'myid', 'mid': 'myid',
	'invite': 'invitelink', 'inv': 'invitelink',
	'status': 'activity', 'play': 'activity',
	'ftn': 'fortnite',
	'w': 'weather', 'wtt': 'weather',
	'ud': 'urban', 'urbandictionary': 'urban', 'udictionary': 'urban',
	'images': 'google-images', 'gi': 'google-images', 'gimages': 'google-images',
	'yt': 'youtube', 'video': 'youtube',
	'changelog': 'log', 'clog': 'log',
	'v': 'version',
	'h': 'help',
	'setprefix': 'newprefix',
	'nick': 'setnickname', 'setnick': 'setnickname',
};

module.exports = function(cmd, client, msg, args, prefix) {
	try {
		if(commands.hasOwnProperty(cmd)) {
			commands[cmd].process(client, msg, args, prefix);
		}
		else {
			commands[aliases[cmd]].process(client, msg, args, prefix);
		}
	}
	catch(e) {
		console.log('Invalid command.');
	}
};