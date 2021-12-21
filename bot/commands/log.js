const version = require('../../package.json').version;
const parseChangelog = require('changelog-parser');

module.exports = {
  desc: function(prefix) {
    return `Get bot's last version changelog.\nWrite \`${prefix}log\` to use.`;
  },
  process: function(client, message) {
    parseChangelog('./CHANGELOG.md', (err, result) => {
      if (err) throw err;
      console.log(`Sent CHANGELOG with ${version} modifications.`);
      message.channel.send(`\`\`\`md\n# ${result.title.toUpperCase()}\n\n## ${result.versions[0].title}\n\n${result.versions[0].body}\`\`\``);
    });
  },
};