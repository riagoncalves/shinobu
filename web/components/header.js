import React from 'react';
import Link from 'next/link';


const Header = () => (
	<header className="shinobu-header">
		<nav className="shinobu-header-menu">
			<Link href="/">
				<a className="title-xsl title-white">Shinobu</a>
			</Link>
			<Link href="/features">
				<a className="info-xsl info-white">Features</a>
			</Link>
			<a href={process.env.serverInvite} className="info-xsl info-white" rel="noreferrer" target="_blank">Support server</a>
		</nav>
		<div className="shinobu-header-profile">
			<button className="btn-primary btn-sl">Login</button>
		</div>
	</header>
);

export default Header;