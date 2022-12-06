import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
//IMPORT COMPONENTES
import LandingPage from './components/inicio/landingPage';
import HomeFoods from './components/home/home';
import Detail from './components/detail/detail';
import CreateRecipe from './components/createRecipe/createRecipe';
import Error404 from './components/error 404/error404';

function App() {
  return (
    <React.Fragment>
      <div>
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/home"} component={HomeFoods} />
          <Route exact path={"/create"} component={CreateRecipe} />
          <Route exact path={"/detail/:id"} component={Detail} />
          <Route path={"*"} component={Error404} />
        </Switch>
      </div>
    </React.Fragment>
  )
}

export default App;
