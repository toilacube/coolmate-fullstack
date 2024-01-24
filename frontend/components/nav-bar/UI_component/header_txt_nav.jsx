import React from 'react';

function HeaderTextNav(props) {
  return (
    <div >
      <p className="underline mt-2 font-bold uppercase mb-5 cursor-pointer">{props.content}</p>
    </div>
  );
}

export default HeaderTextNav;