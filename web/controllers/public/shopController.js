const Background = require('../../../db/models').Background;

module.exports = {
  backgrounds: {
    async index(req, res) {
      const backgrounds = await Background.findAll();
      return res.locals.app.render(req, res, '/shop/backgrounds', {
        backgrounds: backgrounds,
      });
    },
  },
};
