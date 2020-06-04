import React from 'react';
import Layout from '../components/layout';
import discordLogo from '../assets/images/discord.svg';

const Index = () => (
	<Layout>
		<section className="shinobu-hero">
			<div className="text-center">
				<h1 className="title-xl title-white">Shinobu</h1>
				<p className="info-lg info-white">Your personal vampire assistant</p>
				<div className="btn-container">
					<a href="https://discordapp.com/oauth2/authorize?client_id=540860925368991745&scope=bot&permissions=1609955447" className="btn-primary">
						<img src={discordLogo} />
					Add To Discord</a>
					<a href="#" className="btn-secundary">Login</a>
				</div>
			</div>
		</section>
	</Layout>
);

export default Index;