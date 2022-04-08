// import React, { StrictMode } from "react";
// //import ReactDOM from "react-dom";
// import ReactDOM from "react-dom/client";
// // import "./index.css";
// // import App from "./App";
// // import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Recipes from "./components/Recipes";

// import {StrictMode, useEffect} from 'react';
// import {createRoot} from 'react-dom/client';
// import App from "./App";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// function Test(){
//   useEffect(()=>{
//     console.log("rendered");
//   });

//   return <App tab="home" />
// }

// THIS ONE
// const container = document.getElementById('root');
// //const root = createRoot(container, );
// const root = ReactDOM.createRoot(container);
// // root.render(<Test/>)
// root.render(<App />)

// const render = () => {
//    root.render(
//     //  <StrictMode>
//     //    <App />
//     //  </StrictMode> 
//     <App />
//    );
// };

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

{/* <Routes>
  <Route path="/" element={<App />}></Route>
  <Route path="/recipes" element={<Recipes />}></Route>
</Routes> */}
