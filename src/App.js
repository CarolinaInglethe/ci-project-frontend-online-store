import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import SearchBar from './components/SearchBar';
// import ShoppingCartIcon from './components/ShoppingCartIcon';
import ProductDetails from './components/ProductDetails';
import CheckoutForm from './components/CheckoutForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ SearchBar } />
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route
            path="/product-details/:id"
            component={ ProductDetails }
          />
          <Route path="/checkout" component={ CheckoutForm } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
