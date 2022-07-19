import React from 'react';

const LeaderboardUser = ({ user, rank }) => (
  <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 border-b md:border-0 border-white border-solid w-full max-w-2xl items-center py-3.5">
    <div className='flex'>
      <p className="font-main w-10 h-10 mr-4 font-bold text-2xl text-white">
        <span className="text-base font-medium pr-1">#</span>
        {rank}
      </p>
    </div>
    <div className="flex items-center flex-1 col-span-1 md:col-span-2 lg:col-span-4">
      {user.photo ?
        <object data={user.photo} type="image/png" className='w-10 rounded-full'>
          <img src={process.env.DEFAULT_PFP} className='w-10 rounded-full' />
        </object>
        :
        <span className="font-main flex w-10 h-10 justify-center items-center border border-solid border-white rounded-full font-bold text-xs text-white uppercase">
          {user.username.split('#')[0].match(/\b(\w)/g).join('')}
        </span>}
      <p className="font-main text-sm text-white font-bold px-4">{user.username.split('#')[0]}</p>
    </div>
    <div className='mr-4'>
      <p className="font-main w-10 h-10 mr-4 font-bold text-2xl text-white text-right">
        <span className="text-sm font-medium pr-1">Level</span>
        {user.level}
      </p>
    </div>
    <div className='md:col-span-2'>
      <a href={`/users/${user.userID}`} target="_blank" rel="noreferrer" className="font-main text-xs font-bold text-gray-500 bg-zinc-900 rounded-md py-2 px-4 transition ease-in-out duration-200 hover:bg-black">View Profile</a>
    </div>
  </div>
);

export default LeaderboardUser;
