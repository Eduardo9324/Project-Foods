import "./buttonReset.css";
import React from "react";
import { useDispatch } from "react-redux";


const ButtonReset = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(window.location.reload());
  };

  return (
    <React.Fragment>
      <div>
        <button className="btn-reset" onClick={handleClick}>
          Reset
        </button>
      </div>
    </React.Fragment>
  );
};

export default ButtonReset;