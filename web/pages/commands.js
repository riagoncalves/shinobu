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
							<table>
								<thead>
									<tr>
										<th colSpan="4" className="title-white title-xsl bg-main">
											Moderation
										</th>
									</tr>
									<tr>
										<th className="info-xsl info-white info-sbold">Name</th>
										<th className="info-xsl info-white info-sbold">Description</th>
										<th className="info-xsl info-white info-sbold">Usage</th>
										<th className="info-xsl info-white info-sbold">Aliases</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
								</tbody>
							</table>

							<table>
								<thead>
									<tr>
										<th colSpan="4" className="title-white title-xsl bg-main">
											Moderation
										</th>
									</tr>
									<tr>
										<th className="info-xsl info-white info-sbold">Name</th>
										<th className="info-xsl info-white info-sbold">Description</th>
										<th className="info-xsl info-white info-sbold">Usage</th>
										<th className="info-xsl info-white info-sbold">Aliases</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
								</tbody>
							</table>

							<table>
								<thead>
									<tr>
										<th colSpan="4" className="title-white title-xsl bg-main">
											Moderation
										</th>
									</tr>
									<tr>
										<th className="info-xsl info-white info-sbold">Name</th>
										<th className="info-xsl info-white info-sbold">Description</th>
										<th className="info-xsl info-white info-sbold">Usage</th>
										<th className="info-xsl info-white info-sbold">Aliases</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
								</tbody>
							</table>

							<table>
								<thead>
									<tr>
										<th colSpan="4" className="title-white title-xsl bg-main">
											Moderation
										</th>
									</tr>
									<tr>
										<th className="info-xsl info-white info-sbold">Name</th>
										<th className="info-xsl info-white info-sbold">Description</th>
										<th className="info-xsl info-white info-sbold">Usage</th>
										<th className="info-xsl info-white info-sbold">Aliases</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
									<tr>
										<td className="info-xsl info-gray">activity</td>
										<td className="info-xsl info-gray">Switches bot's activity!</td>
										<td className="info-xsl info-gray">Write activity listening/playing/watching activity to use.</td>
										<td className="info-xsl info-gray">act, at</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</Layout>
		);
	}
}
