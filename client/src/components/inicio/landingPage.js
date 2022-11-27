import './landingPage.css';
import React from 'react';
import ButtonIngresar from '../buttonIngresar/buttonIngresar';

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className='logo-food'></div>
      <div className='title'>
        <h1>Bienvenidos a mi cocina.</h1>
      </div>
      <div className='btnCom'>
        <ButtonIngresar />
      </div>
    </React.Fragment>
  );
};

export default LandingPage;