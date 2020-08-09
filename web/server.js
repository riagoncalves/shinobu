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
let profileStore = {};

passport.use(new DiscordStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.CALLBACK_URL,
	scope: scopes,
},
async (accessToken, refreshToken, profile, cb) => {
	profileStore = profile;
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
			return app.render(req, res, '/index', req.query);
		});

		server.get('/profile', async (req, res) => {
			const background = await models.Background.findOne({ where: { id: req.user.BackgroundId } });
			return app.render(req, res, '/profile', {
				background: background ? background.link : 'https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/default-pfp.jpg',
			});
		});

		server.get('/profile/edit', async (req, res) => {
			const background = await models.Background.findOne({ where: { id: req.user.BackgroundId } });
			return app.render(req, res, '/profileEdit', {
				background: background ? background.link : 'https://shinobu-discord.s3-eu-west-1.amazonaws.com/Profile/default-pfp.jpg',
			});
		});

		server.get('/dashboard', (req, res) => {
			return app.render(req, res, '/dashboard',
				{
					profile: profileStore,
					botGuilds: client.guilds,
				},
			);
		});

		server.get('/dashboard/:guildID', async (req, res) => {
			const guild = client.guilds.cache.filter(sGuild => sGuild.id == req.params.guildID);
			const dbGuild = await models.Guild.findOne({ where: { guildID:req.params.guildID } });
			if (!guild) return res.status(404);
			if (!dbGuild) return res.status(404);
			return app.render(req, res, '/guild',
				{
					profile: profileStore,
					guild: Array.from(guild.values())[0],
					dbGuild: dbGuild.dataValues,
				},
			);
		});

		server.post('/dasboard/:guildID/edit', async (req, res) => {
			console.log(req);
		});

		server.get('/login', passport.authenticate('discord'));

		server.get('/callback', passport.authenticate('discord', {
			failureRedirect: '/',
		}), (req, res) => {
			res.redirect('/');
		});

		server.get('/logout', (req, res) => {
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
