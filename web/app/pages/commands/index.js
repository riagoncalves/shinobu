import React from 'react';
import Layout from '../../components/layout';
import CommandsTable from '../../components/commandsTable';

export default class Commands extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
    }

    if(query) {
      pageProps.moderation = query.moderation;
      pageProps.cosmetics = query.cosmetics;
      pageProps.utility = query.utility;
      pageProps.currency = query.currency;
      pageProps.memes = query.memes;
      pageProps.nsfw = query.nsfw;
    }

    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      moderation: props.moderation,
      cosmetics: props.cosmetics,
      utility: props.utility,
      currency: props.currency,
      memes: props.memes,
      nsfw: props.nsfw,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      moderation: this.state.moderation,
      cosmetics: this.state.cosmetics,
      utility: this.state.utility,
      currency: this.state.currency,
      memes: this.state.memes,
      nsfw: this.state.nsfw,
    };

    return (
      <Layout user={props.user} title="Commands">
        <section className="block">
          {props.user && props.user.userID == process.env.ownerID &&
          <div className="flex pt-8 justify-end">
            <a href='/commands/new' className="bg-brand text-xs rounded-md py-1 px-3.5 flex items-center justify-center mx-2 border-2 border-solid border-brand font-main text-white transition duration-350 ease-in-out hover:bg-secondary hover:border-secondary">New Command</a>
          </div>}
          <div className="flex w-full">
            <div className="h-full px-2 py-12 hidden md:inline">
              <h3 className="font-main text-white font-extrabold text-3xl">Categories</h3>
              <nav className='flex flex-col'>
                {props.moderation.length > 0 && <a className="font-main text-base font-bold text-gray-400 transition-colors duration-200 hover:text-white pt-4" href="#" data-control="scroll" data-scroll="Moderation">Moderation</a>}
                {props.cosmetics.length > 0 && <a className="font-main text-base font-bold text-gray-400 transition-colors duration-200 hover:text-white pt-4" href="#" data-control="scroll" data-scroll="Cosmetics">Cosmetics</a>}
                {props.utility.length > 0 && <a className="font-main text-base font-bold text-gray-400 transition-colors duration-200 hover:text-white pt-4" href="#" data-control="scroll" data-scroll="Utility">Utility</a>}
                {props.currency.length > 0 && <a className="font-main text-base font-bold text-gray-400 transition-colors duration-200 hover:text-white pt-4" href="#" data-control="scroll" data-scroll="Currency">Currency</a>}
                {props.memes.length > 0 && <a className="font-main text-base font-bold text-gray-400 transition-colors duration-200 hover:text-white pt-4" href="#" data-control="scroll" data-scroll="Memes">Memes</a>}
                {props.nsfw.length > 0 && <a className="font-main text-base font-bold text-gray-400 transition-colors duration-200 hover:text-white pt-4" href="#" data-control="scroll" data-scroll="NSFW">NSFW</a>}
              </nav>
            </div>
            <div className="flex-1 px-2 pb-12 mt-12">
              {props.moderation.length > 0 && <CommandsTable user={props.user} title="Moderation" rows={props.moderation}/>}
              {props.cosmetics.length > 0 && <CommandsTable user={props.user} title="Cosmetics" rows={props.cosmetics}/>}
              {props.utility.length > 0 && <CommandsTable user={props.user} title="Utility" rows={props.utility}/>}
              {props.currency.length > 0 && <CommandsTable user={props.user} title="Currency" rows={props.currency}/>}
              {props.memes.length > 0 && <CommandsTable user={props.user} title="Memes" rows={props.memes}/>}
              {props.nsfw.length > 0 && <CommandsTable user={props.user} title="NSFW" rows={props.nsfw}/>}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
