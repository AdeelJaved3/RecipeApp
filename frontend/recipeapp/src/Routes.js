import React, { Component } from "react";
import { Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Recipes from "./components/Recipes";

export default class Paths extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" exact component={LoginForm} />
                    <Route path="/recipes" component={Recipes} />
                </Routes>
            </Router>
        )
    }
}