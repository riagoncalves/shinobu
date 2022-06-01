import React from 'react';
import Image from 'next/image';
import Router from 'next/router';
import Layout from '../../components/layout';

export default class ProfileEdit extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.background = query.background;
      pageProps.inventory = query.inventory;
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
      inventory: props.inventory,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/profile/update', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: e.target.querySelector('input[name=title]').value,
        color: e.target.querySelector('input[name=color]').value,
        BackgroundId: e.target.querySelector('select[name=BackgroundId]').value,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if(data.success == true) return window.location.assign('/profile');
      })
      .catch(error => console.log(error));
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      background: this.state.background,
      inventory: this.state.inventory,
    };

    return (
      <Layout user={props.user} title="Edit Profile">
        <section className="flex relative w-full h-full mt-8 flex-col">
          <span className="absolute block w-full h-full top-0 left-0 bg-no-repeat bg-100% bg-top z-1 blur-sm" style={{ backgroundImage: `url(${props.background})` }}></span>
          <div className="flex flex-col items-start md:flex-row py-8 md:items-center z-10 w-full px-2 md:px-8 mx-auto max-w-screen-xl">
            <img src={props.user.photo} className="w-20 md:w-32 rounded-3xl" />
            <div className="pt-3 md:px-8">
              <h2 className="font-main font-extrabold text-white text-3xl">{props.user.username.split('#')[0]}</h2>
              <p className="font-main text-base text-white">{props.user.title}</p>
            </div>
          </div>
          <div className="py-12 rounded-2xl z-10 bg-zinc-800 w-full px-2 md:px-8 mx-auto max-w-screen-xl relative">
            <form onSubmit={this.handleSubmit}>
              <div className="flex pb-4 flex-col justify-center items-center">
                <label htmlFor="title" className="font-main text-white pb-2 text-xl">Title</label>
                <input type="text" id="title" defaultValue={props.user.title} name="title" className='font-main py-2 px-3 border-2 border-solid border-transparent transition-all duration-200 active:border-main focus:border-main active:outline-0 focus:outline-0'/>
              </div>
              <div className="flex py-4 flex-col justify-center items-center">
                <label htmlFor="color" className="font-main text-white pb-2 text-xl">Select your favorite color</label>
                <input type="color" id="color" name="color" defaultValue={props.user.color} />
              </div>
              <div className="flex py-4 flex-col justify-center items-center">
                <label htmlFor="background" className="font-main text-white pb-2 text-xl">Background</label>
                <select name="BackgroundId" id="background" defaultValue={props.user.BackgroundId} className='font-main py-2 px-3 border-2 border-solid border-transparent transition-all duration-200 active:border-main focus:border-main active:outline-0 focus:outline-0'>
                  {props.inventory.map((background) => (
                    <option value={background.BackgroundId} key={background.Background.name}>
                      {background.Background.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit"className="py-1 px-2 flex absolute bottom-full items-center justify-center bg-brand rounded-t-md transition-colors duration-200 hover:bg-secondary right-4">
                <div className='w-3'>
                  <Image src="/images/save.svg" alt="save" width="100%" height="100%" />
                </div>
                <p className="font-main text-white text-xs pl-2 ml-2 border-solid border-l border-white">Save profile</p>
              </button>
            </form>
          </div>
        </section>
      </Layout>
    );
  }
}
