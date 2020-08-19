import React from 'react';
import Layout from '../components/layout';
import CommandsTable from '../components/commandstable';

export default class Commands extends React.Component {
	static async getInitialProps({ req, query }) {
		const pageProps = {};

		if(req && req.user) {
			console.log(query);
			pageProps.user = req.user;
		}
		return pageProps;
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
				<section className="shinobu-commands">
					{props.user && props.user.userID == process.env.ownerID &&
					<div className="flex shinobu-commands-header">
						<a href='/commands/new' className="btn-primary btn-sl">New Command</a>
					</div>}
					<div className="flex shinobu-commands-container">
						<div className="shinobu-commands-navigation">
							<h3 className="title-sm title-white tal">Categories</h3>
							<nav>
								<a className="info-sl info-gray info-bold tal">Moderation</a>
								<a className="info-sl info-gray info-bold tal">Cosmetics</a>
								<a className="info-sl info-gray info-bold tal">Utility</a>
								<a className="info-sl info-gray info-bold tal">Currency</a>
								<a className="info-sl info-gray info-bold tal">Memes</a>
							</nav>
						</div>
						<div className="shinobu-commands-list">
							<CommandsTable title="Moderation"/>
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}
