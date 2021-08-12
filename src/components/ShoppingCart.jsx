import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     productState: [],
  //   };
  // }

  test = () => {
    const { location } = this.props;
    const { state } = location;
    const { addToCart } = state.product;

    const clone = addToCart;
    console.log(clone);
  }

  countRepeatedElements(array, elementToFilter) {
    return array.reduce((accumulator, checkingElement) => (
      elementToFilter === checkingElement ? accumulator + 1 : accumulator),
    0);
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    const { addToCart } = state.product;
    const noRepetElementsAddToCart = [...new Set(addToCart)];
    // const bob = () => {
    //   console.log('oi');
    // }

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
        <Link
          to={ {
            pathname: '/checkout',
            state: {
              products: { noRepetElementsAddToCart },
              products2: { addToCart },
            },
          } }
          data-testid="checkout-products"
        >
          Comprar
        </Link>
        {
          noRepetElementsAddToCart && noRepetElementsAddToCart.length > 0
            ? noRepetElementsAddToCart.map((product) => (
              <div key={ product.id }>
                <p data-testid="shopping-cart-product-name">{ product.title }</p>
                <img src={ product.thumbnail } alt="foto" width="100px" />
                <p>{ product.price }</p>
                <p>{ product.price }</p>
                <p data-testid="shopping-cart-product-quantity">
                  { this.countRepeatedElements(addToCart, product) }
                </p>
                <span>
                  <button
                    data-testid="product-increase-quantity"
                    type="button"
                    onClick={ this.test }
                  >
                    +
                  </button>
                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    onClick={ this.increaseDecrease }
                  >
                    -
                  </button>
                </span>
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
