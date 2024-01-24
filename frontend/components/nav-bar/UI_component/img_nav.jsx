import React from 'react';

function ImgNav(props) {
  return (
    <div className=" mt-3 mr-8 relative">
      <img className="object-cover w-48 h-30" src={props.src} alt="avatar" />
      <p className="text-sm absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2 cursor-pointer">{props.content}</p>
    </div>
  );
}

export default ImgNav;