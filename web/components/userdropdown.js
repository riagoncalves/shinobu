import React from 'react';

const UserDropdown = (props) => {
	console.log(props.user);
	return (
		<button className="user-dropdown">
			<img src={props.user.photo}/>
			<p className="info-white info-xsl info-sbold">{props.user.username.split('#')[0]}</p>
		</button>
	);

};

export default UserDropdown;