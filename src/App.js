import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ShoppingCart from './pages/ShoppingCart';
import ShoppingCartIcon from './components/ShoppingCartIcon';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShoppingCartIcon />
        <Switch>
          <Route exact path="/" component={ SearchBar } />
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
