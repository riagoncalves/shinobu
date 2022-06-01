import React from 'react';
import Layout from '../../components/layout';
import DiscordBtn from '../../components/discordButton';
import SecundaryBtn from '../../components/secundaryButton';
import Router from 'next/router';

export default class Index extends React.Component {
  static async getInitialProps({ req }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
    }
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
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
    };

    return (
      <Layout user={props.user}>
        <section className="flex justify-center items-center flex-col">
          <div className="flex flex-col items-center justify-center p-0 h-screen md:h-auto md:py-80">
            <h1 className="font-main font-extrabold text-white text-center text-6xl md:text-8xl">Shinobu</h1>
            <p className="font-main text-white text-center text-2xl">Your personal discord assistant</p>
            <div className="flex py-8 flex-col md:flex-row">
              <DiscordBtn className="mt-4"/>
              <SecundaryBtn link="/commands" text="Learn more" className="mt-4" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
