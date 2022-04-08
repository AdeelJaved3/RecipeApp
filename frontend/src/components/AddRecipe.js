import React from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default class AddRecipe extends React.Component {
  //Setting the state for the initial launch
    constructor(props) {
      super(props);
      this.state = {
        recipename: "",
        ingredients: "",
        instructions: "",
        servingSize: "",
        category: "",
        notes: ""
      };

      this.handleInputChange = this.handleInputChange.bind(this);
    } 


    //On input change, it updates the state to the new value
    handleInputChange(event) {
      const {name, value} = event.target;

      this.state[name] = value;

    }

    //On button click, makes call to Flask backend API to add a new recipe to the database
    handleButtonClicked = async () => {
      console.log(this.state)
      let body = this.state
      await axios.post("http://localhost:5000/addrecipe", body).then(res =>{
        console.log(res.data);
        
        if(res.data.success){

          window.location.href="/"
        }
        else {
          console.log("error has occcured")
        }
      }).catch(error =>{
        console.log(JSON.stringify(error));
      });
    }


    //Renders frontend components
    render() {
      return (
        <div>
          <h1>Add Recipe</h1>
            <form>
              <label>Recipe Name</label>
              <input 
              type="text" 
              name="recipename" 
              onChange={this.handleInputChange} 
              />

              <label>Ingredients</label>
              <input type="text" name="ingredients"  onChange={this.handleInputChange} />

              <label>instructions</label>
              <input type="text" name="instructions" onChange={this.handleInputChange} />

              <label>Serving Size</label>
              <input type="text" name="servingSize" onChange={this.handleInputChange} />

              <label>Category</label>
              <input type="text" name="category" onChange={this.handleInputChange} />

              <label>Notes</label>
              <input type="text" name="notes" onChange={this.handleInputChange} />
            </form>
            <button onClick={this.handleButtonClicked.bind(this)}>
              Submit
            </button>
      </div>
      );
    }
  }



  /*,{
        // recipeName: this.state.data.recipeName,
        // ingredients: this.state.data.ingredients,
        // instructions: this.state.data.instructions,
        // servingSize: this.state.data.servingSize,
        // category: this.state.data.category,
        // notes: this.state.data.notes
        console.log(data)
      }*/