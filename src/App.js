/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import Home from './pages/Home';
import Hall from './pages/Hall';
import Register from './pages/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/Register" component={Register} />
            <Route path="/Hall" component={Hall} />
            <Route path="/Kitchen" component={Kitchen} />
        </Router>
    )
}

function Kitchen() {
    return (
        <div className="App-header">
            <p>Estamos na cozinha!</p>
        </div>
    );
}

export default App;