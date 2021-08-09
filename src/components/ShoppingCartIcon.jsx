import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCartIcon extends React.Component {
  render() {
    return (
      <button type="button">
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
      </button>
    );
  }
}

export default ShoppingCartIcon;
