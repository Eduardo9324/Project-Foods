
import {
  GET_ALL_RECIPES,
  SEARCH_RECIPE,
  FILTER_BY_DIET,
  FILTER_BY_NAME,
  FILTER_BY_HS,
  FILTER_CREATE,
  GET_DIETS,
  CREATE_RECIPE,
  GET_DETAILS,
} from "../actions";


const initialState = {
  allRecipes: [],
  recipes: [],
  diets: [],
  detail: [],
  /* create: [] */
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };
    
    case SEARCH_RECIPE:
      return {
        ...state,
        allRecipes: action.payload,
      };
    
    case FILTER_BY_DIET:
      const totalRecipes = state.recipes
      const filterDiet =
        action.payload === "All"
          ? totalRecipes
          : totalRecipes.filter((e) =>
            e.diets.find((i) => i.name === action.payload))
      console.log(totalRecipes)
      return {
        ...state,
        allRecipes: filterDiet,
      };
    
    case FILTER_BY_NAME:
      const orderName = [...state.allRecipes]
      const orderByName = orderName.sort((a, b) => {
        if (a.name > b.name) {
          return action.payload === 'asc' ? 1 : -1;
        }
        if (a.name < b.name) {
          return action.payload === 'des' ? 1 : -1;
        }
        return 0;
      })
      return {
        ...state,
        allRecipes: orderByName,
      };
    
    case FILTER_BY_HS:
      const orderHs = [...state.allRecipes]
      const orderByHs = orderHs.sort((a, b) => {
        if (a.healthScore > b.healthScore) {
          return action.payload === 'asc' ? 1 : -1;
        }
        if (a.healthScore < b.healthScore) {
          return action.payload === 'des' ? 1 : -1;
        }
        return 0;
      })
      return {
        ...state,
        allRecipes: orderByHs,
      };
    
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    //PENDIENTE POR PROBAR
    case FILTER_CREATE:
      const filtreByCreate = state.recipes
      const createForFilter =
        action.payload === "created"
          ? filtreByCreate.filter((e) => e.createInDb)
          : filtreByCreate.filter((e) => !e.createInDb);
      /* const filterCreate = state.recipes.filter(e => {
        return e.createInDb.find(i => {
          return i.name === action.payload
        })
      }) */
      return {
        ...state,
        allRecipes: createForFilter.length > 0 ? createForFilter : filtreByCreate /* filterCreate */,
      };
    
    case CREATE_RECIPE:
      /* const totalRes = state.recipes;
      const resCreate =
        action.payload === "All"
          ? totalRes
          : totalRes.filter((e) =>
              e.createInDb.find((i) => i.name === action.payload)
            ); */
      return {
        ...state,
        /* create: resCreate */
      };
    
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    
    default:
      return {
        ...state,
      };
  };
};