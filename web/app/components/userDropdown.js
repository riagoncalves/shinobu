import React from 'react';
import Image from 'next/image';

const UserDropdown = (props) => {
  return (
    <div className="user-dropdown-container" data-control="dropdown">
      <button className="user-dropdown">
        <img src={props.user.photo}/>
        <p className="info-white info-xsl info-sbold">{props.user.username.split('#')[0]}</p>
        <div className='arrow-down'>
          <Image src="/images/down-arrow.svg" alt="arrow down" width="100%" height="100%" />
        </div>
      </button>
      <div className="user-dropdown-menu">
        <a href="/profile" className="info-xsl">Profile</a>
        <a href="/dashboard" className="info-xsl">Dashboard</a>
        <a href="/logout" className="info-xsl logout">Logout</a>
      </div>
    </div>
  );

};

export default UserDropdown;