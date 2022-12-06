import axios from 'axios';
//CONSTANTES ACTIONS
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_HS = 'FILTER_BY_HS';
export const FILTER_CREATE = 'FILTER_CREATE';
export const GET_DIETS = 'GET_DIETS';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_DETAILS = 'GET_DETAILS';


//Trae toda la informacion desde mi rura del backend.
export const getAllRecipes = () => {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/recipes")
      .then(recipe => {
        dispatch({
          type: GET_ALL_RECIPES,
          payload: recipe.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
};

// action para busqueda (searchBar)
export const searchRecipe = (search) => {
  return function (dispatch) {
    axios.get(`http://localhost:3001/api/recipes?name=${search}`)
      .then((recipe) => {
        dispatch({
          type: SEARCH_RECIPE,
          payload: recipe.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Filtra por tipo de dieta
export const filterByDiet = (payload) => {
  return {
    type: FILTER_BY_DIET,
    payload
  }
};

//Filtra por nombre
export const filterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload
  }
};

//Filtra por nivel de salud
export const filterBYHs = (payload) => {
  return {
    type: FILTER_BY_HS,
    payload
  }
};

//Action para filtrar la receta creada
export const filterCreate = (payload) => {
  return {
    type: FILTER_CREATE,
    payload
  }
};

//Obtiene todas las dietas desde el backend
export const getDiets = () => {
  return (dispatch) => {
    axios.get("http://localhost:3001/api/diets")
      .then(diet => {
        dispatch({
          type: GET_DIETS,
          payload: diet.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
};

//Esta action crea una receta en la ruta 
export const createRecipes = (payload) => {
  return async (dispatch) => {
    try {
      const cr = await axios.post("http://localhost:3001/api/recipes", payload)
      console.log(cr)
      return dispatch({
        type: CREATE_RECIPE,
      })
    } catch (error) {
      console.log(error)
    }
  }
};

//Obtiene los detalles de cada receta por su id
export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const detail = await axios.get(`http://localhost:3001/api/recipes/${id}`)
      console.log(detail)
      return dispatch({
        type: GET_DETAILS,
        payload: detail.data
      })

    } catch (error) {
      console.log(error)
    }
  }
};
