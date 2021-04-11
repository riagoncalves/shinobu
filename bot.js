const actions = require('./bot/actions');
const client = require('./bot/client');

for (const action in actions) {
  client.on(action, actions[action].init);
}

setInterval(() => {
  actions['ready'].setActivity(client);
}, 900000);

client.login(`${process.env.TOKEN}`);