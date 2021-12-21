import React from 'react';
import Image from 'next/image';

const DiscordBtn = () => (
  <a href={process.env.inviteLink} className="btn-primary btn-lg">
    <div className='btn-img'>
      <Image src="/images/discord.svg" alt="discord logo" width={35} height={35} />
    </div>
    Add To Discord
  </a>
);

export default DiscordBtn;