import React from 'react';
import Layout from '../../components/layout';
import DashboardGuild from '../../components/dashboardGuild';

export default class Dashboard extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.guilds = query.profile.guilds;
      pageProps.botGuilds = query.botGuilds;
    }
    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      guilds: props.guilds,
      botGuilds: props.botGuilds,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      guilds: this.state.guilds,
      botGuilds: this.state.botGuilds,
    };

    const hasId = function(guildId) {
      return props.botGuilds.cache != undefined && props.botGuilds.cache.get(guildId) != undefined;
    };

    return (
      <Layout user={props.user} title="Dashboard">
        <section className="h-full block">
          <div className="flex flex-col items-center">
            <h2 className="font-main text-white font-extrabold text-2xl px-8 pb-16 pt-20">YOUR SERVERS</h2>
            {props.guilds.map((guild) => (
              guild.owner && <DashboardGuild guild={guild} botGuild={hasId(guild.id)} />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}
