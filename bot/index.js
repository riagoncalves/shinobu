const actions = require('./actions');
const client = require('./client');

for (const action in actions) {
  client.on(action, actions[action].init);
}

setInterval(() => {
  actions['ready'].setActivity(client);
}, 900000);

client.login(`${process.env.TOKEN}`);
