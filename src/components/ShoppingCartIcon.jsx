import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

class ShoppingCartIcon extends React.Component {
  render() {
    return (
      <Link
        className="link"
        to="/shopping-cart"
        data-testid="shopping-cart-button"
      >
        <FaShoppingCart size="2vw" />
      </Link>
    );
  }
}

export default ShoppingCartIcon;
