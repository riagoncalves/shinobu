const YouTube = require('discord-youtube-api');
const youtube = new YouTube(process.env.API_YT);

module.exports = {
  desc: function(prefix) {
    return `Sends youtube searched video.\nWrite \`${prefix}yt\` to use.`;
  },
  process: async function(client, msg, args) {
    try {
      const video = await youtube.searchVideos(args.join(' '));
      msg.channel.send(`https://www.youtube.com/watch?v=${video.id}`);
    }
    catch (e) {
      console.error(e);
      msg.channel.send('No results!');
    }
  },
};