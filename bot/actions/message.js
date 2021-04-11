const client = require('../client');
const fs = require('fs');
const commands = require('../commands');
const models = require('../../db/models');
const messageExperience = 1;
const expMultiplier = 100;
const initialDonuts = 2000;
const levelUpDonuts = 500;

const functions = {
  async giveExp(user, msg) {
    let finalExp = user.experience + messageExperience;
    const level = user.level * expMultiplier < finalExp ? user.level + 1 : user.level;
    const donuts = level > user.level ? user.donuts + levelUpDonuts : user.donuts;
    finalExp = level > user.level ? 0 : finalExp;

    if (level > user.level) {
      msg.channel.send(`**${msg.author.username}** you reached **level ${level}**! Congratulations!!\nYou won **${levelUpDonuts} donuts** for leveling up! 🍩`);
      // msg.author.send(`You won **${levelUpDonuts} donuts** for leveling up! 🍩`);
    }

    user.update({
      experience: finalExp,
      level: level,
      donuts: donuts,
    });
  },
  async userChecker(user, msg) {
    const savedUser = await models.User.findOne({ where: { userID: user.id } });
    if (savedUser) {
      console.log(`${user.username}#${user.discriminator} exists!`);
      this.giveExp(savedUser, msg);
    }
    else {
      models.User.create({
        userID: user.id,
        username: `${user.username}#${user.discriminator}`,
        photo: user.avatarURL({ size: 512, format: 'png' }),
        donuts: initialDonuts,
        dailyCheck: new Date(new Date().setDate(new Date().getDate() - 1)),
      });
      console.log(`Creating ${user.username}#${user.discriminator}!`);
    }
  },
  commandsRunner(msg, prefix) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    commands(cmd, client, msg, args, prefix);
  },
};

module.exports = {

  async init(msg) {
    if (msg.author.bot) return;
    if (msg.channel.type === 'dm') return;

    functions.userChecker(msg.author, msg);

    const prefixesFile = JSON.parse(fs.readFileSync('./data/prefixes.json', 'utf8'));
    const prefix = prefixesFile[msg.guild.id].prefix;

    if (msg.content.startsWith(prefix)) functions.commandsRunner(msg, prefix);
    if (msg.content.startsWith(process.env.PREFIX)) functions.commandsRunner(msg, process.env.PREFIX);

    return;
  },
};