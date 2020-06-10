import React from 'react';
import Layout from '../components/layout';
import DiscordBtn from '../components/discordbtn';
import SecundaryBtn from '../components/secundarybtn';

const Index = () => (
	<Layout>
		<section className="shinobu-hero">
			<div className="text-center">
				<h1 className="title-xl title-white">Shinobu</h1>
				<p className="info-lg info-white">Your personal discord assistant</p>
				<div className="btn-container">
					<DiscordBtn/>
					<SecundaryBtn link="#" text="Learn more" />
				</div>
			</div>
		</section>
	</Layout>
);

export default Index;