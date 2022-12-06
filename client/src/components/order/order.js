import './order.css';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
//IMPORT ACTIONS
import {
  filterByDiet,
  filterByName,
  filterBYHs,
  filterCreate,
} from "../../Redux/actions";


const Order = () => {
  const dispatch = useDispatch();
  const created = useSelector((state) => state.recipes);

  const handleFilterByDiet = (e) => {
    dispatch(filterByDiet(e.target.value))
  };

  const handleFilterByName = (e) => {
    dispatch(filterByName(e.target.value))
  };

  const handleFilterByHs = (e) => {
    dispatch(filterBYHs(e.target.value));
  };

  const handleFilterCreate = (e) => {
    /* e.preventDefault(); */
    dispatch(filterCreate(e.target.value))
  }; 


  return (
    <React.Fragment>
      <div>
        <select name="select" onChange={handleFilterByName}>
          <option value="asc">A - Z</option>
          <option value="des">Z - A</option>
        </select>

        <select name="select" onChange={handleFilterByDiet}>
          <option value="All">Todas las dietas</option>
          <option value="gluten free">Gluten free</option>
          <option value="dairy free">Dairy free</option>
          <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="fodmap friendly">Fodmap friendly</option>
          <option value="vegetarian">Vegetarian</option>
        </select>

        <select name="select" onChange={handleFilterByHs}>
          <option value="asc">Mas saludables</option>
          <option value="des">Menos saludables</option>
        </select>

        <select onChange={(e) => handleFilterCreate(e)}>
          <option value="All">Todas</option>
          <option value="created">Creadas</option>
          <option value="api">Api</option>
          {/* {created.length && created.map((e) => {
            console.log(created)
            return (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            )
          })} */}
        </select>
      </div>
    </React.Fragment>
  );
};

export default Order;