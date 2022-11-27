import "./searchBar.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
//IMPORT ACTIONS
import { searchRecipe } from "../../Redux/actions";


const SearchBar = () => {
  //INICIO ESTADO LOCAL PARA EL CAMPO DE BUSQUEDA
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchRecipe(search))
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };


  return (
    <React.Fragment>
      <div>
        <form className="searchBar" onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onInputChange}
            value={search}
            placeholder="Search by name"
          />
          <input type="submit" value="Buscar" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;