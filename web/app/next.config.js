const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'assets/styles')],
  },
  env: {
    ownerID: process.env.OWNER_ID,
    inviteLink: process.env.INVITE_LINK,
    serverInvite: process.env.SERVER_INVITE,
    googleTag: process.env.G_TAG,
  },
};
