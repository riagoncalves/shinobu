import React from 'react';
import Layout from '../../../components/layout';

export default class Background extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
    }

    if(query) {
      pageProps.backgrounds = query.backgrounds;
    }

    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      backgrounds: props.backgrounds,
    };
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      backgrounds: this.state.backgrounds,
    };

    console.log(props.backgrounds);

    return (
      <Layout user={props.user} title="Shop - Backgrounds">
        <section className="h-full block">
          <div className="flex flex-col items-center">
            <h2 className="font-main text-white font-extrabold text-2xl px-8 pb-16 pt-20">Backgrounds</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 w-full'>
              {props.backgrounds.map((background) => (
                <article key={background.id} className='w-full rounded border overflow-hidden'>
                  <div className='w-full text-center py-2 bg-blue-900'>
                    <h3 className="font-main text-white font-extrabold text-xl">{background.label}</h3>
                  </div>
                  <span className='block h-48 w-full border-t border-b border-solid border-black bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${background.link})` }}>
                  </span>
                  <div className='w-full text-center py-4 bg-blue-900'>
                    <a href="#" className='py-2 px-4 text-white font-main border-2 border-solid border-black bg-brand hover:bg-secondary transition-all duration-300 ease-in-out rounded-full'>{background.value} 🍩</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
