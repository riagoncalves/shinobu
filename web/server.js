const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const cookieSession = require('cookie-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const scopes = ['identify', 'email', 'guilds', 'guilds.join'];
const models = require('../db/models');
const initialDonuts = 2000;

passport.use(new DiscordStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.CALLBACK_URL,
	scope: scopes,
},
async (accessToken, refreshToken, profile, cb) => {
	let user = await models.User.findOne({ where: { userID: profile.id } });
	if (user) return cb(null, user);

	user = await models.User.create({
		userID: profile.id,
		username: `${profile.username}#${profile.discriminator}`,
		photo: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`,
		donuts: initialDonuts,
		dailyCheck: new Date(new Date().setDate(new Date().getDate() - 1)),
	});
	return cb(null, user);
}));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

const app = next({
	dev,
	dir: './web',
});
const handle = app.getRequestHandler();

module.exports = client => {
	app.prepare().then(() => {
		const server = express();
		server.use(cookieSession({
			maxAge: 24 * 60 * 60 * 1000,
			keys: [process.env.COOKIE_KEY],
		}));
		server.use(passport.initialize());
		server.use(passport.session());

		server.get('/', (req, res) => {
			// console.log(req.user);
			return app.render(req, res, '/index', req.query);
		});

		server.get('/auth/discord', passport.authenticate('discord'));

		server.get('/callback', passport.authenticate('discord', {
			failureRedirect: '/',
		}), function(req, res) {
			res.redirect('/');
		});

		server.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
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
