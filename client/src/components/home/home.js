import './home.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
//COMPONENTES
import NavBar from '../navBar/navBar';
import RecipeCard from '../recipeCard/recipeCard';
import Paginated from '../paginated/paginated';
//IMPORT ACTIONS
import { getAllRecipes } from '../../Redux/actions';


const HomeFoods = () => {
  const recipes = useSelector((state) => state.allRecipes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])

  //ESTADOS PARA EL PAGINADO
  const [pageRecipe, setPageRecipe] = useState(1); //MI PAGINA ACTUAL
  const [recipesForPages, setRecipesForPages] = useState(9); //ELEMENTOS A MOSTRAR POR PAGINA
  //MULTIPLICO LA PAGINA ACTUAL POR LA CANTIDAD DE ELEMENTOS A MOSTRAR POR PAGINA
  const indexOfLastRecipe = pageRecipe * recipesForPages
  const indexOfFirstRecipe = indexOfLastRecipe - recipesForPages
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const pages = (numberPage) => {
    setPageRecipe(numberPage)
  };
  
  return (
    <React.Fragment>
      <div className="homeFoods">
        <div className="Nav">
          <NavBar />
        </div>
        <Paginated
          recipesForPages={recipesForPages}
          recipes={recipes.length}
          pages={pages}
        />
        <div className='cardRender'>
          {currentRecipes.map((e, index) => {
            return (
              <Link key={index} to={"/detail/" + e.id}>
                <RecipeCard
                  key={index}
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  diets={e.diets}
                  healthScore={e.healthScore}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeFoods;