import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import sendAlert from "../utility";
import "./Recipes.scss"; 



function Recipes(){
  // const [id, setId] = useState('');
  // const [recipeName, setRecipeName] = useState('');
  // const [Ingredients, setIngredients] = useState('');
  // const [Instructions, setInstructions] = useState('');
  // const [Category, setCategory] = useState('');
  // const [Notes, setNotes] = useState('');

  const [recipes, setRecipes] = useState([])
  //recipes = this.state
  //setRecipes = this.setState

  useEffect(()=>{
    axios.get("http://localhost:5000/recipes").then(res =>{
      console.log(res)
      setRecipes(res.data.rows)
    }).catch(err =>{
      console.log(err)
    })
  }, [])


  function handleButtonClick(id, recipename, ingredients, instructions, servingSize, category, notes){
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

async function handleButtonDelete(id, recipename, ingredients, instructions, servingSize, category, notes){
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

  const confirmed = window.confirm(`Do you really want to delete ${recipename}`)
  if(confirmed) {
    await axios.post("http://localhost:5000/deleterecipe", body).then(res =>{
      console.log(res.data);
      
      if(res.status === 204){

        window.location.href="/"
      }
      else {
        console.log("error has occcured")
      }
    }).catch(error =>{
      console.log(JSON.stringify(error));
    });
  }
  // await axios.post("http://localhost:5000/deleterecipe", body).then(res =>{
  //   console.log(res.data);
    
  //   if(res.status === 204){
  //     console.log(res.data);
  //     window.location.href="/"
  //   }
  //   else {
  //     console.log("error has occcured")
  //   }
  // }).catch(error =>{
  //   console.log(JSON.stringify(error));
  // });
}





  // const fetchRecipes = async () => {
  //   const response = await axios("http://localhost:5000/recipes");
  //   console.log(response.data.rows)
  //   setRecipes([...recipes, response.data.rows])
  //   console.log(recipes)
  // };
  // useEffect(() => {
  //   fetchRecipes();
  // }, []);
  



      //Renders the frontend components
        return(
            <div className="header">
                <Table className="table">
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
                      {recipes.map((item) => (
                        <tr>
                        <td>{item.id}</td>
                        <td>{item.recipename}</td>
                        <td>{item.ingredients.toString()}</td>
                        <td>{item.instructions.toString()}</td>
                        <td>{item.servingSize}</td>
                        <td>{item.category}</td>
                        <td>{item.notes}</td>
                        <td><Button onClick={handleButtonClick.bind(this, item.id, item.recipename, item.ingredients, item.instructions, item.servingSize, item.category, item.notes)}>Edit</Button>
                        </td>
                        <td><Button onClick={handleButtonDelete.bind(this, item.id, item.recipename, item.ingredients, item.instructions, item.servingSize, item.category, item.notes)}>Delete Recipe</Button></td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
                
                <Button className="addrecipe" href="/addRecipe"> Add Recipe</Button>
            </div>
        )
    }



export default Recipes;

/*  
useEffect(()=>{
    fetch(
      `http://localhost:5000/recipes`,{
        method: "GET"
      }
    )
  }).then(res => res.json())
    .then(response =>{
      setRecipes(response.items);

    }).catch(error => console.log(error));
*/