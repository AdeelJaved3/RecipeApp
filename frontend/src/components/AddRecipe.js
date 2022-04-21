import React from 'react';
import axios from 'axios';
import sendAlert from '../utility';
import "./addRecipe.scss"; 

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
      let body = this.state
      if(sendAlert(body)) {
        const confirmed = window.confirm("Do you really want to add this recipe?")
        if(confirmed){
          await axios.post("http://localhost:5000/addrecipe", body).then(res =>{
            console.log(res.data);

            if(res.status === 200){
              window.location.href="/"
            }
            else {
              console.log("error has occcured")
            }
          }).catch(error =>{
            console.log(JSON.stringify(error));
          });
        }
      }
    }



    //Renders frontend components
    render() {
      return (
        <div>
          <h1>Add Recipe</h1>
            <form>
              
              <h3>
              <label className='addrecipename'>Recipe Name</label>
              <input className='inputrecipename' type="text" name="recipename" onChange={this.handleInputChange} />
              </h3>
              
              <h3>
              <label>Ingredients</label>
              <textarea rows="3" cols="20" type="text" name="ingredients"  onChange={this.handleInputChange} />
              </h3>

              <h3>
              <label>Instructions</label>
              <textarea rows="3" cols="20" type="text" name="instructions" onChange={this.handleInputChange} />
              </h3>

              <h3>
              <label>Serving Size</label>
              <input type="text" name="servingSize" onChange={this.handleInputChange} />
              </h3>

              <h3>
              <label>Category</label>
              <input list="category" name="category" onChange={this.handleInputChange} />
              </h3>

              <datalist id ="category">
                <option value = "Sandwich"/>
                <option value = "Pasta"/>
                <option value = "Soup"/>
                <option value = "Salad"/>
              </datalist>

              <h3>
              <label>Notes</label>
              <textarea rows="3" cols="20" type="text" name="notes" onChange={this.handleInputChange} />
              </h3>
              
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