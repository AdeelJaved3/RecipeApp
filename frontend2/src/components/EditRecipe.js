import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/esm/Table';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


export default class EditRecipe extends React.Component {
  //Setting the state for the initial launch
    constructor(props) {
        super(props);
        this.state = {
          oldRecipeName: sessionStorage.getItem("recipename"),
          recipename: sessionStorage.getItem("recipename"),
          ingredients: sessionStorage.getItem("ingredients"),
          instructions: sessionStorage.getItem("instructions"),
          servingSize: sessionStorage.getItem("servingSize"),
          category: sessionStorage.getItem("category"),
          notes: sessionStorage.getItem("notes")
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //On input change, it updates the state to the new value
  handleInputChange(event) {
    const {name, value} = event.target;
    this.state[name] = value;
    console.log(this.state)

  }

  //On button click, makes a call to Flask backend API to edit the current recipe
  handleButtonClicked = async () => {
    console.log(this.state)
    let body = this.state
    await axios.post("http://localhost:5000/editrecipe", body).then(res =>{
      console.log(res.data);
      
      if(res.data.success){
        console.log(res.data);
        window.location.href="/"
      }
      else {
        console.log("error has occcured")
      }
    }).catch(error =>{
      console.log(JSON.stringify(error));
    });
  }

  




  //Renders the frontend components
  render() {
    return (
      <div>
          <h1>Edit Recipe</h1>
          <form>
              <label>Recipe Name</label>
              <input 
              type="text" 
              name="recipename" 
              onChange={this.handleInputChange}
              defaultValue={sessionStorage.getItem('recipename')}
              />

              <label>Ingredients</label>
              <input type="text" name="ingredients" defaultValue={sessionStorage.getItem('ingredients')} onChange={this.handleInputChange} />

              <label>instructions</label>
              <input type="text" name="instructions" defaultValue={sessionStorage.getItem('instructions')} onChange={this.handleInputChange} />

              <label>Serving Size</label>
              <input type="text" name="servingSize" defaultValue={sessionStorage.getItem('servingSize')} onChange={this.handleInputChange} />

              <label>Category</label>
              <input type="text" name="category" defaultValue={sessionStorage.getItem('category')} onChange={this.handleInputChange} />

              <label>Notes</label>
              <input type="text" name="notes" defaultValue={sessionStorage.getItem('notes')} onChange={this.handleInputChange} />
            </form>
            <button onClick={this.handleButtonClicked.bind(this)}>
              Submit
            </button>
      </div>
    );
  }
}
