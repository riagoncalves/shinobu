import React from 'react';
import Layout from '../../components/layout';
import Router from 'next/router';
import LeaderboardUser from '../../components/leaderboardUser';

export default class Profile extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
    }

    pageProps.users = query.users;

    return pageProps;
  }

  componentDidMount() {
    Router.beforePopState(({ as }) => {
      location.href = as;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      users: props.users,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      users: this.state.users,
    };

    return (
      <Layout user={props.user} title="Leaderboard">
        <section className="flex relative w-full h-full mt-8 flex-col">
          <div className="flex flex-col items-center">
            <h2 className="font-main text-white font-extrabold text-2xl px-8 pb-16 pt-20">Leaderboard</h2>
            {props.users.map((appUser, index) => (
              <LeaderboardUser key={appUser.userID} rank={index + 1} user={appUser} />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}