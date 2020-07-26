import React from 'react';
import Layout from '../components/layout';

export default class Guild extends React.Component {
	static async getInitialProps({ req, query }) {
		const pageProps = {};

		if(req && req.user) {
			console.log(query);
			pageProps.user = req.user;
			pageProps.guild = query.guild;
			pageProps.dbGuild = query.dbGuild;
		}
		return pageProps;
	}

	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			guild: props.guild,
			dbGuild: props.dbGuild,
		};
	}

	render() {

		const props = {
			...this.props,
			user: this.state.user,
			guild: this.state.guild,
			dbGuild: this.state.dbGuild,
		};

		return (
			<Layout user={props.user}>
				<section className="shinobu-guild">
				</section>
			</Layout>
		);
	}
}
