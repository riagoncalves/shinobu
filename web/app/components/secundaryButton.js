import React from 'react';

const SecundaryBtn = (props) => (
  <a href={props.link} className={`${props.className} py-2 px-6 flex items-center justify-center margin-y-2 font-main font-bold text-gray-500 text-base rounded-lg border-2 border-solid border-black cursor-pointer bg-black transition-all duration-300 ease-in-out hover:-translate-y-1 mx-2`}>{props.text}</a>
);

export default SecundaryBtn;
