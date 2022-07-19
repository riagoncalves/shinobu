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
          <span className="absolute block w-full h-full top-0 left-0 bg-no-repeat bg-100% bg-top z-1 blur-sm" style={{ backgroundImage: `url(${props.background})` }}></span>
          <div className="flex flex-col items-start md:flex-row py-8 md:items-center z-10 w-full px-2 md:px-8 mx-auto max-w-screen-xl">
            <object data={props.user.photo} type="image/png" className='w-20 md:w-32 rounded-3xl'>
              <img src={process.env.DEFAULT_PFP} className='w-20 md:w-32 rounded-3xl' />
            </object>
            <div className="pt-3 md:px-8">
              <h2 className="font-main font-extrabold text-white text-3xl">{props.user.username.split('#')[0]}</h2>
              <p className="font-main text-base text-white">{props.user.title}</p>
            </div>
          </div>
          <div className="py-12 rounded-2xl z-10 bg-zinc-800 w-full px-2 md:px-8 mx-auto max-w-screen-xl relative">
            <a href={`users/${props.user.userID}`} className="py-1 px-2 flex absolute bottom-full items-center justify-center bg-brand rounded-t-md transition-colors duration-200 hover:bg-secondary right-36">
              <div className='w-4'>
                <Image src="/images/profile.svg" alt="save" width="100%" height="100%" />
              </div>
              <p className="font-main text-white text-xs pl-2 ml-2 border-solid border-l border-white">Public profile</p>
            </a>
            <a href='/profile/edit' className="py-1 px-2 flex absolute bottom-full items-center justify-center bg-brand rounded-t-md transition-colors duration-200 hover:bg-secondary right-4">
              <div className='w-3'>
                <Image src="/images/edit.svg" alt="save" width="100%" height="100%" />
              </div>
              <p className="font-main text-white text-xs pl-2 ml-2 border-solid border-l border-white">Edit profile</p>
            </a>
            <div className="flex md:flex-row flex-col">
              <div className="flex flex-col flex-1 pr-4">
                <div>
                  <p className="font-main text-white font-extrabold text-2xl">Level {props.user.level}</p>
                  <span className="block relative mt-4 mb-2 w-full h-4 rounded-md bg-zinc-900">
                    <span className="block absolute h-4 left-0 top-0 rounded-md bg-white" style={{ width: `${(props.user.experience / (props.user.level * 100)) * 100}%` }}></span>
                  </span>
                  <div>
                    <p className="font-main text-base text-gray-400 text-right"><span className="font-semibold text-white">{props.user.experience}</span> / {props.user.level * 100}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-main text-white font-extrabold text-xl">Currency</h3>
                  <div className="flex items-center pt-2">
                    <div className='w-6'>
                      <Image src="/images/donut.png" alt="save" width="100%" height="100%" />
                    </div>
                    <p className="font-main font-bold text-gray-400 text-sm px-2">Donuts:</p>
                    <p className="font-main font-bold text-white text-sm px-2">{numFormatter(props.user.donuts)}</p>
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="font-main text-white font-extrabold text-xl">Reputation</h3>
                  <div className="flex items-center pt-2">
                    <p className="font-main font-bold text-white text-sm">{props.user.rep}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-1/2 flex pl-4 justify-center items-center flex-col">
                <div className="pb-8">
                  <p className="font-main text-white font-extrabold text-xl text-center pb-2">Background</p>
                  <img src={props.background} className="w-80" />
                </div>
                <div className="w-full flex py-4 flex-col justify-center items-center border-t border-solid border-gray-400">
                  <p className="font-main text-white font-extrabold text-xl pt-4 pb-2">Color</p>
                  <span className='block w-40 h-20 rounded-md' style={{ backgroundColor: props.user.color }}></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
