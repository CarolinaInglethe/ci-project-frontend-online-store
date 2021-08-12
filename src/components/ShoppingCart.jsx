import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPriceCart: 0,
      totalProduct: 0,
    };
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    const { addToCart } = state.product;

    const { totalProduct } = this.state;

    return (
      <div>
        <Link
          to={ {
            pathname: '/',
            state: {
              product: addToCart,
            },
          } }
        >
          voltar
        </Link>
        {
          addToCart && addToCart.length !== 0 ? addToCart.map((product) => (
            <div key={ product.id }>

              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <img src={ product.thumbnail } alt="foto" width="100px" />
              <p>{`R$ ${product.price}` }</p>
              <p data-testid="shopping-cart-product-quantity">{ totalProduct }</p>
            </div>

          ))
            : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ).isRequired,
};

export default ShoppingCart;
