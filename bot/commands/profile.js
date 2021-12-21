const models = require('../../db/models');
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

const functions = {
  numFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
  },
  async profileImage(user) {
    const username = user.username.split('#')[0];
    const donuts = this.numFormatter(user.donuts);
    const canvas = Canvas.createCanvas(800, 568);
    const ctx = canvas.getContext('2d');

    if (user.BackgroundId) {
      // Cover
      const image = await models.UserBackground.findOne({ where: { id: user.BackgroundId }, include: ['Background'] });
      const link = image.Background.dataValues.link;
      const background = await Canvas.loadImage(link);
      ctx.drawImage(background, 0, -70, canvas.width, canvas.width * background.height / background.width);
    }
    else {
      ctx.fillStyle = user.color;
      ctx.fillRect(0, 0, canvas.width, 400);
    }

    // Custom Color Background
    ctx.lineJoin = 'round';
    ctx.lineWidth = 35;
    ctx.fillStyle = user.color;
    ctx.strokeStyle = user.color;
    ctx.strokeRect(0 + (35 / 2), 252 + (35 / 2), canvas.width - 35, 316 - 35);
    ctx.fillRect(0 + (35 / 2), 252 + (35 / 2), canvas.width - 35, 316 - 35);

    // White Text Background
    const textBg = await Canvas.loadImage('https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/text-bg.png');
    ctx.drawImage(textBg, 19, 269, 762, 281);

    // Username
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = user.color;
    const usernameWidth = ctx.measureText(username).width;
    ctx.fillText(username, (canvas.width / 2) - (usernameWidth / 2), ((30 * 1.5) / 2) + 356);

    // Title
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#7a7a7a';
    const titleWidth = ctx.measureText(user.title).width;
    ctx.fillText(user.title, (canvas.width / 2) - (titleWidth / 2), ((20 * 1.5) / 2) + 401);

    // Rep Number
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = user.color;
    const repnumWidth = ctx.measureText(user.rep).width;
    ctx.fillText(user.rep, (306 / 2) - (repnumWidth / 2), ((30 * 1.5) / 2) + 289);

    // Rep Label
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#7a7a7a';
    const repLabel = 'Reputation';
    const replblWidth = ctx.measureText(repLabel).width;
    ctx.fillText(repLabel, (306 / 2) - (replblWidth / 2), ((20 * 1.5) / 2) + 328);

    // Donuts Number
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = user.color;
    const donutsnumWidth = ctx.measureText(donuts).width;
    ctx.fillText(donuts, (1297 / 2) - (donutsnumWidth / 2), ((30 * 1.5) / 2) + 289);

    // Donuts Label
    ctx.font = '20px Verdana';
    ctx.fillStyle = '#7a7a7a';
    const donutsLabel = 'Donuts';
    const donutslblWidth = ctx.measureText(donutsLabel).width;
    ctx.fillText(donutsLabel, (1297 / 2) - (donutslblWidth / 2), ((20 * 1.5) / 2) + 328);

    // Level Label
    ctx.font = '15px Verdana';
    ctx.fillStyle = '#7a7a7a';
    const levelLabel = 'Level';
    ctx.fillText(levelLabel, 79, ((15 * 1.5) / 2) + 451);

    // Level Num
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = user.color;
    ctx.fillText(user.level, 122, ((30 * 1.5) / 2) + 440);

    // Experience Value
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = user.color;
    ctx.fillText(user.experience, 600, ((20 * 1.5) / 2) + 450);

    // Experience Limit
    ctx.font = '20px Arial';
    ctx.fillStyle = '#7a7a7a';
    const finalExp = user.level * 100;
    const experienceLimitLabel = ` / ${finalExp} XP`;
    const expWidth = ctx.measureText(user.experience).width;
    ctx.fillText(experienceLimitLabel, 600 + expWidth, ((20 * 1.5) / 2) + 450);

    // Exp Limit Bar
    const expLimitBar = await Canvas.loadImage('https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/level-limit.png');
    ctx.drawImage(expLimitBar, 71, 470, 657, 34);

    // ExpBar
    ctx.lineJoin = 'round';
    ctx.lineWidth = 20;
    ctx.fillStyle = user.color;
    ctx.strokeStyle = user.color;
    const percentageExp = user.experience / finalExp;
    ctx.strokeRect(71 + (20 / 2), 470 + (20 / 2), 657 * percentageExp - 20, 34 - 20);
    ctx.fillRect(71 + (20 / 2), 470 + (20 / 2), 657 * percentageExp - 20, 34 - 20);

    // Profile Picture
    ctx.beginPath();
    ctx.arc(400, 247, 95, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const photo = user.photo ? user.photo : 'https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/default-pfp.jpg';
    const avatar = await Canvas.loadImage(photo);
    ctx.drawImage(avatar, 303, 152, 194, 194);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'profile.png');
    return attachment;
  },
};

module.exports = {
  desc: function(prefix) {
    return `Write \`${prefix}profile\` to see your own profile and \`${prefix}profile <user>\` to see other user profile.`;
  },
  process: async function(client, message) {
    if(message.mentions.users.first()) {
      const user = await models.User.findOne({ where: { userID: message.mentions.users.first().id } });
      if(!user) return message.channel.send('Invalid user!');
      const attachment = await functions.profileImage(user);
      return message.channel.send(attachment);
    }
    const user = await models.User.findOne({ where: { userID: message.author.id } });

    const attachment = await functions.profileImage(user);

    message.channel.send({ files: [attachment] });
  },
};