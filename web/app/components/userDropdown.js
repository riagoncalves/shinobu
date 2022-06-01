import React from 'react';
import Image from 'next/image';

const UserDropdown = (props) => {
  return (
    <div className="relative" data-control="dropdown">
      <button className="js-user-dropdown flex items-center bg-transparent border-0 outline-0 cursor-pointer">
        <img className="rounded-full w-7" src={props.user.photo}/>
        <p className="font-main font-semibold text-white text-xs px-2">{props.user.username.split('#')[0]}</p>
        <div className='js-arrow-down w-2 transition duration-75 ease-in-out rotate-180 !rotate-0'>
          <Image src="/images/down-arrow.svg" alt="arrow down" width="100%" height="100%" />
        </div>
      </button>
      <div className="js-user-dropdown-menu flex flex-col absolute py-2 px-4 right-0 top-10 rounded-lg border-8 border-solid border-zinc-900 bg-zinc-900 transition-all duration-100 ease-in-out scale-90 translate-x-2 -translate-y-2 z-100 invisible opacity-0">
        <a href="/profile" className="flex-1 p-2 mb-2 text-gray-400 transition-all duration-200 rounded-lg ease-in-out whitespace-nowrap font-main text-xs text-center hover:bg-zinc-800">Profile</a>
        <a href="/dashboard" className="flex-1 p-2 mb-2 text-gray-400 transition-all duration-200 rounded-lg ease-in-out whitespace-nowrap font-main text-xs text-center hover:bg-zinc-800">Dashboard</a>
        <a href="/logout" className="flex-1 p-2 mb-2 text-red-600 transition-all duration-200 rounded-lg ease-in-out whitespace-nowrap font-main text-xs text-center hover:bg-zinc-800">Logout</a>
      </div>
    </div>
  );

};

export default UserDropdown;