import React from 'react';
import Layout from '../components/layout';
import Router from 'next/router';

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
		fetch('/profile/edit', {
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
			.then(data => console.log(data))
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
			<Layout user={props.user}>
				<section className="shinobu-profile_edit">
					<span className="shinobu-profile_edit-background" style={{ backgroundImage: `url(${props.background})` }}></span>
					<div className="shinobu-profile_edit-card container">
						<img src={props.user.photo} />
						<div className="shinobu-profile_edit-card-info">
							<h2 className="title-sm title-white tal">{props.user.username.split('#')[0]}</h2>
							<p className="info-sl info-white tal">{props.user.title}</p>
						</div>
					</div>
					<div className="shinobu-profile_edit-details container">
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor="title" className="info-md info-white">Title</label>
								<input type="text" id="title" defaultValue={props.user.title} name="title"/>
							</div>
							<div>
								<label htmlFor="color" className="info-md info-white">Select your favorite color:</label>
								<input type="color" id="color" name="color" defaultValue={props.user.color}/>
							</div>
							<div>
								<label htmlFor="background" className="info-md info-white">Background</label>
								<select name="BackgroundId" id="background" defaultValue={props.user.BackgroundId}>
									{props.inventory.map((background) => (
										<option value={background.BackgroundId} key={background.Background.name}>
											{background.Background.name}
										</option>
									))}
								</select>
							</div>
							<button type="submit" value="Submit">Save</button>
						</form>
					</div>
				</section>
			</Layout>
		);
	}
}
