const GoogleImages = require('google-images');
const imagesClient = new GoogleImages(process.env.CSE_ID, process.env.API_GI);

module.exports = {
  desc: function(prefix) {
    return `Get searched image.\nWrite \`${prefix}gi <search>\` to use.`;
  },
  process: async function(client, msg, args) {
    try {
      const images = await imagesClient.search(args.join(' '));
      let replyImage = images[Math.floor(Math.random() * images.length)].url;
      if (!replyImage.endsWith('.png') && !replyImage.endsWith('.jpeg') && !replyImage.endsWith('.jpg')) {
        replyImage = `${replyImage}.jpg`;
      }
      msg.channel.send({ files: [replyImage] });
    }
    catch (e) {
      console.error(e);
      msg.channel.send('No results!');
    }
  },
};