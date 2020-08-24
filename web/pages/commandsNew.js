import React from 'react';
import Layout from '../components/layout';

export default class CommandsNew extends React.Component {
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
				<section className="shinobu-commands_new">
					<form>
						<div className="form-group">
							<label className="info-md info-white" htmlFor="name">Name</label>
							<input id="name" type="text" name="name"/>
						</div>
						<div className="form-group">
							<label className="info-md info-white" htmlFor="description">Description</label>
							<input id="description" type="textarea" name="description"/>
						</div>
						<div className="form-group">
							<label className="info-md info-white" htmlFor="usage">Usage</label>
							<input id="usage" type="textarea" name="usage"/>
						</div>
						<div className="form-group">
							<label className="info-md info-white" htmlFor="aliases">Aliases</label>
							<input id="aliases" type="text" name="aliases" placeholder="a,b,c,d"/>
						</div>
						<div className="form-group">
							<label className="info-md info-white" htmlFor="category">Category</label>
							<select name="category" id="category">
								<option selected disabled>Choose a Category</option>
								<option value="Moderation">Moderation</option>
								<option value="NSFW">NSFW</option>
								<option value="Cosmetics">Cosmetics</option>
								<option value="Utility">Utility</option>
								<option value="Currency">Currency</option>
								<option value="Memes">Memes</option>
							</select>
						</div>
					</form>
				</section>
			</Layout>
		);
	}
}
