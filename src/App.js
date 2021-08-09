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
          <Route path="/" component={ SearchBar } />
          <Route path="/shopping-card" component={ ShoppingCart } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
