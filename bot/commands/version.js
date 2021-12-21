const version = require('../../package.json').version;

module.exports = {
  desc: function(prefix) {
    return `Get bot version.\nWrite \`${prefix}version\` to use.`;
  },
  process: function(client, message) {
    message.channel.send(`My version is \`${version}\`!`);
  },
};