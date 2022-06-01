import React from 'react';
import Image from 'next/image';
import Layout from '../../components/layout';

export default class CommandsEdit extends React.Component {
  static async getInitialProps({ req, query }) {
    const pageProps = {};

    if(req && req.user) {
      pageProps.user = req.user;
      pageProps.command = query.command;
    }
    return pageProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      command: props.command,
    };
  }

  handleSubmit(e, id) {
    fetch(`/commands/${id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target.querySelector('input[name=name]').value,
        description: e.target.querySelector('input[name=description]').value,
        usage: e.target.querySelector('input[name=usage]').value,
        aliases: e.target.querySelector('input[name=aliases]').value.split(','),
        category: e.target.querySelector('select[name=category]').value,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if(data.success == true) return window.location.assign('/commands');
      })
      .catch(error => console.log(error));
  }

  render() {

    const props = {
      ...this.props,
      user: this.state.user,
      command: this.state.command,
    };

    return (
      <Layout user={props.user} title={`Edit ${props.command.name}`}>
        <section className="py-16 px-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit(e, props.command.id);
          }}>
            <div className="flex pb-4 flex-col justify-center items-center">
              <label className="pb-2 font-main text-xl text-white text-center" htmlFor="name">Name</label>
              <input className='font-main py-2 px-3.5 border-2 border-solid border-transparent transition-all duration-150 active:border-brand active:outline-0 focus:outline-0 focus:border-brand' id="name" type="text" name="name" defaultValue={props.command.name}/>
            </div>
            <div className="flex py-4 flex-col justify-center items-center">
              <label className="pb-2 font-main text-xl text-white text-center" htmlFor="description">Description</label>
              <input className='font-main py-2 px-3.5 border-2 border-solid border-transparent transition-all duration-150 active:border-brand active:outline-0 focus:outline-0 focus:border-brand' id="description" type="textarea" name="description" defaultValue={props.command.description}/>
            </div>
            <div className="flex py-4 flex-col justify-center items-center">
              <label className="pb-2 font-main text-xl text-white text-center" htmlFor="usage">Usage</label>
              <input className='font-main py-2 px-3.5 border-2 border-solid border-transparent transition-all duration-150 active:border-brand active:outline-0 focus:outline-0 focus:border-brand' id="usage" type="textarea" name="usage" defaultValue={props.command.usage}/>
            </div>
            <div className="flex py-4 flex-col justify-center items-center">
              <label className="pb-2 font-main text-xl text-white text-center" htmlFor="aliases">Aliases</label>
              <input className='font-main py-2 px-3.5 border-2 border-solid border-transparent transition-all duration-150 active:border-brand active:outline-0 focus:outline-0 focus:border-brand' id="aliases" type="text" name="aliases" placeholder="a,b,c,d" defaultValue={props.command.aliases.join(',')}/>
            </div>
            <div className="flex py-4 flex-col justify-center items-center">
              <label className="pb-2 font-main text-xl text-white text-center" htmlFor="category">Category</label>
              <select className='font-main py-2 px-3.5 border-2 border-solid border-transparent transition-all duration-150 active:border-brand active:outline-0 focus:outline-0 focus:border-brand' name="category" id="category" defaultValue={props.command.category}>
                <option selected disabled>Choose a Category</option>
                <option value="Moderation">Moderation</option>
                <option value="NSFW">NSFW</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Utility">Utility</option>
                <option value="Currency">Currency</option>
                <option value="Memes">Memes</option>
              </select>
            </div>
            <div className="flex py-4 flex-col justify-center items-center">
              <button type="submit" className="flex p-2 items-center jutify-center bg-brand rounded-md transition-all duration-250 ease-in-out outline-0 border-0 cursor-pointer hover:bg-secondary">
                <div className='w-3'>
                  <Image src="/images/save.svg" alt="save" width="100%" height="100%" />
                </div>
                <p className="pl-2 ml-2 border-l border-solid border-white text-white text-center font-main text-xs">Save</p>
              </button>
            </div>
          </form>
        </section>
      </Layout>
    );
  }
}
