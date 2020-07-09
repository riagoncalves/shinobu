import React from 'react';
import Layout from '../components/layout';

export default class Dashboard extends React.Component {
	static async getInitialProps({ req, query }) {
		const pageProps = {};

		if(req && req.user) {
			console.log(query);
			pageProps.user = req.user;
			pageProps.guilds = query.profileStore.guilds;
		}
		return pageProps;
	}

	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			guilds: props.guilds,
		};
	}

	render() {

		const props = {
			...this.props,
			user: this.state.user,
			guilds: this.state.guilds,
		};

		return (
			<Layout user={props.user}>
				<section className="shinobu-hero">
					<div className="text-center">
						{props.guilds.map((guild) => (
							guild.owner && <p key={guild.id}>{guild.name}</p>
						))}
					</div>
				</section>
			</Layout>
		);
	}
}
