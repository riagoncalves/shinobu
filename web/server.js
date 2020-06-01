const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
	dev,
	dir: './web',
});
const handle = app.getRequestHandler();

module.exports = client => {
	app.prepare().then(() => {
		const server = express();

		server.get('/', (req, res) => {
			return app.render(req, res, '/index', req.query);
		});

		server.all('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(port, (err) => {
			if (err) throw err;
			console.log(`> Ready on http://localhost:${port}`);
			console.log(`${client.user.tag} web interface initiated!`);
		});
	});
};
