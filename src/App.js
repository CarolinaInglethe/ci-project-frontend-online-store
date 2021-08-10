import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './pages/ShoppingCart';
import SearchBar from './components/SearchBar';
import ShoppingCartIcon from './components/ShoppingCartIcon';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShoppingCartIcon />
        <Switch>
          <Route exact path="/" component={ SearchBar } />
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route
            path="/product-details/:id"
            component={ ProductDetails }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
