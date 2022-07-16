const User = require('../../../db/models').User;

module.exports = {
  async index(req, res) {
    const users = await User.findAll({
      limit: 50,
      order: [
        ['level', 'DESC']],
    });
    return res.locals.app.render(req, res, '/leaderboard', {
      users: users,
    });
  },
};