import './navBar.css';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ButtonCreate from '../buttonCreate/buttonCreate';
import ButtonReset from '../buttonReset/buttonReset';
import SearchBar from '../searchBar/searchBar';
import Order from '../order/order';

export default class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="navBar">
          <Link to={"/"}>
            <button className="btn-inicio">Inicio</button>
          </Link>
          <ButtonCreate />
          <ButtonReset />
          <SearchBar />
          <Order />
        </div>
      </React.Fragment>
    );
  };
};