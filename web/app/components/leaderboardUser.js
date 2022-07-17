import React from 'react';

const LeaderboardUser = ({ user }) => (
  <div className="flex w-4/5 max-w-2xl items-center py-3.5">
    <div className="flex items-center flex-1">
      {user.photo ?
        <img className="w-10 rounded-full" src={user.photo}/>
        :
        <span className="font-main flex w-10 h-10 justify-center items-center border border-solid border-white rounded-full font-bold text-xs text-white uppercase">
          {user.username.split('#')[0].match(/\b(\w)/g).join('')}
        </span>}
      <p className="font-main text-sm text-white font-bold px-4">{user.username.split('#')[0]}</p>
    </div>
    <div>
      <span className="font-main flex w-10 h-10 mr-4 justify-center items-center border border-solid border-white rounded-full font-bold text-xs text-white uppercase">
        {user.level}
      </span>
    </div>
    <a href={`/users/${user.userID}`} target="_blank" rel="noreferrer" className="font-main text-xs font-bold text-gray-500 bg-zinc-900 rounded-md py-2 px-4 transition ease-in-out duration-200 hover:bg-black">Profile</a>
  </div>
);

export default LeaderboardUser;
