import './detail.css';
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//IMPORT ACTIONS
import { getDetail } from '../../Redux/actions';


const Detail = () => {
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.detail);

  return (
    <React.Fragment>
      <div className="content-back">
        <Link to={"/home"}>
          <button className="btn-volver">Volver</button>
        </Link>

        <div className="cardDetail">
          {myRecipe ? (
            <div className="card-img">
              <h1 className="name">{myRecipe.name}</h1>
              <img className="img" src={myRecipe.image} />
              <h2 className="types">Type: {myRecipe.type}</h2>
              <h2 className="dietss">
                Diet:{" "}
                {myRecipe.diets?.map((f) => (
                  <span>{f.name}</span>
                ))}
              </h2>
              <h2 className="hs">Health Score: {myRecipe.healthScore}</h2>
              <h3 className="summary">Summary: {myRecipe.summary}</h3>
              <h4 className="steps">Steps: {myRecipe.steps}</h4>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );

};

export default Detail;