import React from 'react';
import Layout from '../components/layout';
import Router from 'next/router';

export default class Profile extends React.Component {
	static async getInitialProps({ req }) {
		const pageProps = {};

		if(req && req.user) {
			pageProps.user = req.user;
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
		};
	}

	render() {

		const props = {
			...this.props,
			user: this.state.user,
		};

		return (
			<Layout user={props.user}>
				<section className="shinobu-profile">
				</section>
			</Layout>
		);
	}
}
