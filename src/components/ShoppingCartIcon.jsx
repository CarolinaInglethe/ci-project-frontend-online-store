import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

class ShoppingCartIcon extends React.Component {
  render() {
    return (
      <Link
        to={ {
          pathname: '/shopping-cart',
          state: {
            product: this.props,
          },
        } }
        className="link"
        data-testid="shopping-cart-button"
      >
        <FaShoppingCart size="2vw" />
      </Link>
    );
  }
}

export default ShoppingCartIcon;
