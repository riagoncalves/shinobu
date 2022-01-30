const models = require('../../db/models');
const fs = require('fs');

module.exports = {
  init(guild) {
    models.Guild.create({
      guildID: guild.id,
      guildName: guild.name,
      banner: guild.iconURL({ size: 512, format: 'png' }),
      ownerID: guild.ownerId,
      ownerName:`${guild.owner.user.username}#${guild.owner.user.discriminator}`,
      prefix: process.env.DEFAULT_PREFIX,
    });

    const prefixesFile = JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));
    prefixesFile[guild.id] = {
      prefix: process.env.DEFAULT_PREFIX,
    };
    fs.writeFile('./data/prefixes.json', JSON.stringify(prefixesFile), (error) => {
      if(error) {
        console.log(`Prefixes File Error: ${error}`);
      }
      else {
        console.log('Updating prefixes.json!');
      }
    });
  },
};