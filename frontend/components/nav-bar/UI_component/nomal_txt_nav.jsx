import React from 'react';

function NomalTextNav(props) {
  return (
    <div>
      <p className="text-sm mt-4 text-txt_nav cursor-pointer hover:text-blue-500">{props.content}</p>
    </div>
  );
}

export default NomalTextNav;