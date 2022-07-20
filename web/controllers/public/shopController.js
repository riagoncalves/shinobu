module.exports = {
  backgrounds: {
    index(req, res) {
      return res.locals.app.render(req, res, '/shop/backgrounds', {});
    },
  },
};