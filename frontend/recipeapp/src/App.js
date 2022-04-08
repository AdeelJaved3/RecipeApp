import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter, Route, Routes} from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";
import Recipes from "./components/Recipes";

import Home from "./components/Home";
import LoginForm from "./components/LoginForm";

import Paths from './Routes';

class App extends React.Component{
  getData(){
    axios({
      method: "POST",
      url: "localhost:5000/login",
      })
      .then((response) => {
        const res = response.data;
        // setUser({
        //   user_name: res.username,
        //   pass_word: res.password,
        // });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  render(){
    return(
      <div className = "app">
        <Recipes/>
      </div>
    )
  }
}

// function App() {
//   return (
//   <div>
//     <BrowserRouter>
//     <Routes>
//       <Route exact path="/" component={Recipes}></Route>
//     </Routes>
//     </BrowserRouter>
//   </div>
//   );
// }

// function App() {
//   const [user, setUser] = useState({ username: "", password: "" });
//   const [error, setError] = useState(""); //will catch if login details are not correct
//   const Login = (details) => {
//     console.log(details);
//   };

//   const Logout = () => {
//     console.log("Logout");
//   };

//   function getData() {
//     axios({
//       method: "POST",
//       url: "localhost:5000/login",
//     })
//       .then((response) => {
//         const res = response.data;
//         setUser({
//           user_name: res.username,
//           pass_word: res.password,
//         });
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         }
//       });
//   }

//   return (
//     <div className="app">
//       <LoginForm />
//     </div>

//     // <div className="App">
//     //     <Paths />
//     // </div>
//   );
// }

export default App;
