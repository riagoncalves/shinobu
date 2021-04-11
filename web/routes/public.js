const express = require('express');
const models = require('../../db/models');
const client = require('../../bot/client.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  return res.locals.app.render(req, res, '/home', req.query);
});

router.get('/profile', async (req, res) => {
  if(!req.user) return res.redirect('/');
  const background = await models.Background
    .findOne({
      where: {
        id: req.user.BackgroundId,
      },
    });

  return res.locals.app.render(req, res, '/profile', {
    background: background ? background.link : process.env.DEFAULT_PFP,
  });
});

router.get('/profile/edit', async (req, res) => {
  if(!req.user) return res.redirect('/');

  const background = await models.Background
    .findOne({
      where: {
        id: req.user.BackgroundId,
      },
    });

  const userbackgrounds = await models.UserBackground
    .findAll(({
      where:
      {
        UserId: req.user.id,
      },
      include: ['Background'],
    }));

  return res.locals.app.render(req, res, '/profile/edit', {
    background: background ? background.link : process.env.DEFAULT_PFP,
    inventory: userbackgrounds,
  });
});

router.put('/profile/edit', async (req, res) => {
  if(!req.user) return res.json({ success: false });

  const user = await models.User
    .findOne({
      where: {
        id: req.user.id,
      },
    });

  if (
    user.update({
      title: req.body.title,
      color: req.body.color,
      BackgroundId: parseInt(req.body.BackgroundId),
    })) {
    req.login(user, function(err) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  }
});

router.get('/dashboard', (req, res) => {
  if(!req.user) return res.redirect('/');
  return res.locals.app.render(req, res, '/dashboard',
    {
      profile: res.locals.discordProfile,
      botGuilds: client.guilds,
    },
  );
});

router.get('/dashboard/:guildID', async (req, res) => {
  if(!req.user) return res.redirect('/dashboard');
  let guildConfirm = false;

  client.guilds.cache.forEach(guild => {
    console.log(guild);
    if (guild.id == req.params.guildID && req.user.userID == guild.ownerID) {
      guildConfirm = true;
    }
  });

  if(!guildConfirm) return res.redirect('/dashboard');
  const guild = client.guilds.cache.filter(
    (sGuild) => sGuild.id == req.params.guildID);

  const dbGuild = await models.Guild
    .findOne({
      where: {
        guildID:req.params.guildID,
      },
    });

  if (!guild) return res.status(404);
  if (!dbGuild) return res.status(404);

  return res.locals.app.render(req, res, '/dashboard/edit',
    {
      profile: res.locals.discordProfile,
      guild: Array.from(guild.values())[0],
      dbGuild: dbGuild.dataValues,
    },
  );
});

router.get('/commands', async (req, res) => {
  await models.Command
    .findAll()
    .then(
      (commands) => {
        return res.locals.app.render(req, res, '/commands', {
          moderation: commands.filter(
            (command) => command.category == 'Moderation'),
          cosmetics: commands.filter(
            (command) => command.category == 'Cosmetics'),
          utility: commands.filter(
            (command) => command.category == 'Utility'),
          currency: commands.filter(
            (command) => command.category == 'Currency'),
          memes: commands.filter(
            (command) => command.category == 'Memes'),
          nsfw: commands.filter(
            (command) => command.category == 'NSFW'),
        });
      });
});

router.get('/commands/new', (req, res) => {
  if(!req.user) return res.redirect('/');
  if (req.user.userID != process.env.OWNER_ID) return res.redirect('/');
  return res.locals.app.render(req, res, '/commands/new', req.query);
});

router.post('/commands/new', async (req, res) => {
  if(!req.user) return res.redirect('/');
  if (req.user.userID != process.env.OWNER_ID) return res.json({ success: false });

  const command = await models.Command
    .findOne({
      where: {
        name: req.body.name,
      },
    });

  if (!command) {
    const newCommand = models.Command.create(req.body);

    if (newCommand) {
      return res.json({ success: true });
    }
    else {
      return res.json({ success: false });
    }
  }
  else {
    return res.json({
      success: false,
      error: 'Command already exists.',
    });
  }
});

router.delete('/commands/:id', async (req, res) => {
  if(!req.user) return res.redirect('/');
  if (req.user.userID != process.env.OWNER_ID) return res.json({ success: false });

  const command = await models.Command
    .findOne({
      where: {
        id: req.params.id,
      },
    });

  if (command) {
    command.destroy();
    return res.json({ success: true });
  }
  else {
    return res.json({ success: false });
  }
});

router.get('/commands/:id/edit', async (req, res) => {
  if(!req.user) return res.redirect('/');
  if (req.user.userID != process.env.OWNER_ID) return res.redirect('/');

  const command = await models.Command
    .findOne({
      where: {
        id: req.params.id,
      },
    });

  return res.locals.app.render(req, res, '/commands/edit', {
    command: command.dataValues,
  });
});

router.put('/commands/:id/edit', async (req, res) => {
  if(!req.user) return res.redirect('/');
  if (req.user.userID != process.env.OWNER_ID) return res.json({ success: false });

  const command = await models.Command
    .findOne({
      where: {
        id: req.params.id,
      },
    });

  if (command.update(req.body)) {
    return res.json({ success: true });
  }
  else {
    return res.json({ success: false });
  }
});

module.exports = router;