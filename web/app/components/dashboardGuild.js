import React from 'react';

const DashboardGuild = (props) => (
  <div className="flex w-4/5 max-w-2xl items-center py-3.5">
    <div className="flex items-center flex-1">
      {props.guild.icon ?
        <img className="w-10 rounded-full" src={`https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.png?size=512`}/>
        :
        <span className="font-main flex w-10 h-10 justify-center items-center border border-solid border-white rounded-full font-bold text-xs text-white uppercase">
          {props.guild.name.match(/\b(\w)/g).join('')}
        </span>}
      <p className="font-main text-sm text-white font-bold px-4">{props.guild.name}</p>
    </div>
    {props.botGuild ?
      <a className="font-main text-xs font-bold text-white bg-green-600 rounded-md py-2 px-4 transition ease-in-out duration-200 hover:bg-green-700">Coming soon..</a>
      // <a href={`dashboard/${props.guild.id}`} className="font-main text-xs font-bold text-white bg-green-600 rounded-md py-2 px-4 transition ease-in-out duration-200 hover:bg-green-700">Manage Server</a>
      :
      <a href={`${process.env.inviteLink}&guild_id=${props.guild.id}`} target="_blank" rel="noreferrer" className="font-main text-xs font-bold text-gray-500 bg-zinc-900 rounded-md py-2 px-4 transition ease-in-out duration-200 hover:bg-black">Set up Shinobu</a> }
  </div>
);

export default DashboardGuild;
