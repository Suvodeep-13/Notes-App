import React from 'react';

const Header = ({mode,setMode}) => {

  const changeMode = () => { // Switching the Mode
    setMode(!mode)
  }

  return <div className='app-header'>
    <h1>Notes List</h1>
    <label className="switch">
      <input onClick={changeMode} type="checkbox"/>
      <span className="slider round"></span>
    </label>
  </div>;
};

export default Header;
