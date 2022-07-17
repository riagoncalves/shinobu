import React from 'react';
import Link from 'next/link';
import UserDropdown from './userDropdown';


const Header = (props) => {
  return (
    <header className="flex">
      <nav className="flex flex-1 items-center">
        <Link href='/'>
          <a className="font-main text-xl font-bold text-white pr-4">Shinobu</a>
        </Link>
        <a className="font-main text-white text-xs text-center px-4" href='/commands'>Commands</a>
        <a className="font-main text-white text-xs text-center px-4" href='/leaderboard'>Leaderboard</a>
        <a href={process.env.serverInvite} className="font-main text-white text-xs text-center px-4" rel="noreferrer" target="_blank">Support server</a>
      </nav>
      <div>
        { props.user ? <UserDropdown user={props.user} />
          :
          <a href='/login' className="bg-brand text-xs rounded-md py-1 px-3.5 flex items-center justify-center mx-2 border-2 border-solid border-brand font-main text-white transition duration-350 ease-in-out hover:bg-secondary hover:border-secondary">Login</a> }
      </div>
    </header>
  );
};

export default Header;
