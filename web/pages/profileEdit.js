import React from 'react';
import Layout from '../components/layout';
import Router from 'next/router';

export default class ProfileEdit extends React.Component {
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

		return (
			<Layout user={props.user}>
				<section className="shinobu-profile_edit">
					<span className="shinobu-profile-background" style={{ backgroundImage: `url(${props.background})` }}></span>
					<div className="shinobu-profile-card container">
						<img src={props.user.photo} />
						<div className="shinobu-profile-card-info">
							<h2 className="title-sm title-white tal">{props.user.username.split('#')[0]}</h2>
							<p className="info-sl info-white tal">{props.user.title}</p>
						</div>
					</div>
					<div className="shinobu-profile-details container"></div>
				</section>
			</Layout>
		);
	}
}
