import "./recipeCard.css";
import React from "react";

const RecipeCard = ({ name, image, diets, healthScore }) => {
  return (
    <React.Fragment>
      <div className="recipeCard">
        <div className="card-image">
          <h3 className="name">{name}</h3>
          <img className="img" src={image} alt={`Recipe ${name}`} />
          <h4 className="healthScore">healthScore: {healthScore}</h4>
          <h4 className="type-diet">
            Diets: {diets.map((e) => e.name).join(" - ")}
          </h4>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecipeCard;