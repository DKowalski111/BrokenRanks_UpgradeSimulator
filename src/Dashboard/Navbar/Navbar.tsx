import React from 'react';
import logoImage from '../../images/img__logo.svg';


const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md" style={{ background: '#000000', height: 'auto' }}>
        <div className="container-fluid">
          <div className="logo_div" style={{ width: '30%', maxWidth: '150px' }}>
            <img className="d-block" src={logoImage} alt="Logo" />
          </div>
          <h1
            className="navbar-brand fs-3 navbar-right main main-theme-text"
            style={{
              fontWeight: 500,
            }}
          >
            Upgrade Simulator
          </h1>
        </div>
      </nav>
      <img className="shadows-image" src={require("../../images/top.jpg")} alt="Shadows" />
    </div>
  );
};

export default Navbar;
