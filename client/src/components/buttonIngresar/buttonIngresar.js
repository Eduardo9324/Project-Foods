import './buttonIngresar.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonIngresar = () => {
  return (
    <React.Fragment>
      <div>
        <Link to={'/home'}>
          <div>
            <button className='btnIngresar'>Ingresar</button>
          </div>
        </Link>
      </div>
    </React.Fragment>
  )
};

export default ButtonIngresar;