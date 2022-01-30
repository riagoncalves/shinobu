const fs = require('fs');
const models = require('../../db/models');
const owner = process.env.OWNER_ID;

module.exports = {
  desc: function(prefix) {
    return `Set new prefix for your server.\nWrite \`${prefix}newprefix\` to use.`;
  },
  process: async function(client, message, args) {
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_GUILD') || (message.author.id === owner)) {
      const server = await models.Guild.findOne({ where: { guildID: message.channel.guild.id } });
      server.update({ prefix: args[0] });

      const prefixesFile = await JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));
      prefixesFile[server.guildID] = {
        prefix: args[0],
      };
      fs.writeFile('./data/prefixes.json', JSON.stringify(prefixesFile), (error) => {
        if(error) {
          console.log(`Prefixes File Error: ${error}`);
        }
        else {
          console.log('Updating prefixes.json!');
        }
      });
      message.channel.send(`Your server new prefix is \`${args[0]}\`!`);
    }
    else {
      message.reply('You don\'t have permissions to do that!');
    }
  },
};