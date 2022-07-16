import React from 'react';
import Image from 'next/image';
import Layout from '../../components/layout';
import Router from 'next/router';

export default class Profile extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.background = query.background;
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
      background: props.background,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      background: this.state.background,
    };

    function numFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
    }

    return (
      <Layout user={props.user} title="Profile">
        <section className="flex relative w-full h-full mt-8 flex-col">
          
        </section>
      </Layout>
    );
  }
}