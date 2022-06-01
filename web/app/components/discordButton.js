import React from 'react';
import Image from 'next/image';

const DiscordBtn = (props) => (
  <a href={process.env.inviteLink} className={`${props.className} py-2 px-6 flex items-center justify-center margin-y-2 font-main font-bold text-white text-base rounded-lg border-2 border-solid border-brand cursor-pointer bg-brand transition-all duration-300 ease-in-out hover:bg-secondary hover:border-secondary hover:-translate-y-1`}>
    <div className='pr-3 w-9'>
      <Image src="/images/discord.svg" alt="discord logo" width={35} height={35} />
    </div>
    Add To Discord
  </a>
);

export default DiscordBtn;
