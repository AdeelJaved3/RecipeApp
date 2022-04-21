import React from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios';



class Recipes extends React.Component{
    
  //Setting the state for the initial launch
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    //Sets the data to the current state 
    componentDidMount = async () => {
        this.setState({data: this.state.data});
        this.handleGetRecipes();
    }

    //Gets recipes from Flask backend API using Axios
    handleGetRecipes = async () => {
        //Do restful api call here
        await axios.get('http://localhost:5000/recipes').then(res => {
          if (res.data.success) {

            const concatArr = this.state.data.concat(res.data.rows)
            const result = concatArr.filter((item, idx) => concatArr.indexOf(item) === idx)
            this.setState({data: result});

          }
          else {
            console.log("error has occcured")
          }
        }).catch(error => {
          console.log(JSON.stringify(error));

        });
    }

    //On button click, sets the state data to the session storage data
    handleButtonClick = async (id, recipename, ingredients, instructions, servingSize, category, notes) => {
        console.log(recipename);
        console.log(ingredients);
        //Doing session storage to pass values to the edit recipe page.
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('recipename', recipename);
        sessionStorage.setItem('ingredients', ingredients);
        sessionStorage.setItem('instructions', instructions);
        sessionStorage.setItem('servingSize', servingSize);
        sessionStorage.setItem('category', category);
        sessionStorage.setItem('notes', notes);

        window.location.href="/editRecipe"
    }

    //On button click, calls Flask backend API to delete the specific recipe from database
    handleButtonDelete = async (id, recipename, ingredients, instructions, servingSize, category, notes) => {
        let body = {
          'id': id,
          'recipename': recipename,
          'ingredients': ingredients,
          'instructions': instructions,
          'servingSize': servingSize,
          'category': category,
          'notes': notes
        }
        console.log(body);
        await axios.post("http://localhost:5000/deleterecipe", body).then(res =>{
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
    render(){
        return(
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                          <th>ID</th>
                        <th>Recipe Name</th>
                        <th>Ingredients</th>
                        <th>Instructions</th>
                        <th>Serving Size</th>
                        <th>Category</th>
                        <th>Notes</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((item) => (
                        <tr>
                        <td>{item.id}</td>
                        <td>{item.recipename}</td>
                        <td>{item.ingredients.toString()}</td>
                        <td>{item.instructions.toString()}</td>
                        <td>{item.servingSize}</td>
                        <td>{item.category}</td>
                        <td>{item.notes}</td>
                        <td><Button onClick={this.handleButtonClick.bind(this, item.id, item.recipename, item.ingredients, item.instructions, item.servingSize, item.category, item.notes)}>Edit</Button></td>
                        <td><Button onClick={this.handleButtonDelete.bind(this, item.id, item.recipename, item.ingredients, item.instructions, item.servingSize, item.category, item.notes)}>Delete Recipe</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                
                <Button href="/addRecipe"> Add Recipe</Button>
            </div>
        )
    }
}


export default Recipes;
