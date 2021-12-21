const models = require('../../db/models');
const dailyDonuts = 100;

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}daily\` to get your daily donuts.`;
  },
  process: async function(client, message) {
    const user = await models.User.findOne({ where: { userID: message.author.id } });
    const hourDiff = Math.abs(user.dailyCheck.getTime() - new Date(Date.now()).getTime()) / 1000 / 60 / 60;

    if(hourDiff >= 20) {
      const donuts = user.donuts + dailyDonuts;
      user.update({
        donuts: donuts,
        dailyCheck: new Date(Date.now()),
      });

      message.reply(`You've received **${dailyDonuts} donuts** as your daily bonus! 🍩`);
    }
    else {
      message.reply(`It seems you already claimed your daily donuts today, you can get more in: **${20 - Math.round(hourDiff)} hours**`);
    }
  },
};