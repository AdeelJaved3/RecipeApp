import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';

//Defining Routes for the different pages in the app
function App() {
  return (
    <div>
    <BrowserRouter>
      <Route exact path="/" component={Recipes}></Route>
      <Route exact path="/addrecipe" component={AddRecipe}></Route>
      <Route exact path="/editrecipe" component={EditRecipe}></Route>
    </BrowserRouter>
  </div>
  );
}

export default App;
