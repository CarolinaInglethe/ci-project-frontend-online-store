import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import SearchBar from './components/SearchBar';
// import ShoppingCartIcon from './components/ShoppingCartIcon';
import ProductDetails from './components/ProductDetails';
import CheckoutForm from './components/CheckoutForm';

function App() {
  return (
    <Router>
      <div className="App" basename={ process.env.PUBLIC_URL }>

        <Switch>
          <Route exact path="/" component={ SearchBar } />
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route
            path="/product-details/:id"
            component={ ProductDetails }
          />
          <Route path="/checkout" component={ CheckoutForm } />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
