import React from 'react';

function ImgTxtNav(props) {
  return (
    <div className="flex items-center mb-3 mr-2">
      <img className="object-cover rounded-full w-8 h-8 border border-gray-300 mr-2 hover:border-blue-500" src={props.src} alt="avatar" />
      <p className="text-sm mt-2 text-txt_nav cursor-pointer hover:text-blue-500">{props.content}</p>
    </div>
  );
}

export default ImgTxtNav;