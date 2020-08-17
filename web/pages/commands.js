import React from 'react';
import Layout from '../components/layout';

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
				</section>
			</Layout>
		);
	}
}
