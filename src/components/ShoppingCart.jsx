import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { addToCart } = location.state.product;
    this.state = {
      productState: addToCart,
    };

    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
  }

  add(event) {
    const { productState } = this.state;
    const precisaSerString = `${event.target.name}`;
    const getOneProduct = productState.find((e) => e.id === precisaSerString);
    productState.push(getOneProduct);
    this.setState({
      productState,
    });
    console.log(productState);
  }


  subtract(event) {
    const { productState } = this.state;
    const precisaSerString = `${event.target.name}`;
    const getOneProduct = productState.find((e) => e.id === precisaSerString);
    const locateElement = productState.indexOf(getOneProduct);
    productState.splice(locateElement, 1);
    this.setState({
      productState,
    });
    console.log(productState);
  }

  countRepeatedElements(array, elementToFilter) {
    return array.reduce((accumulator, checkingElement) => (
      elementToFilter === checkingElement ? accumulator + 1 : accumulator),
    0);
  }

  render() {
    const { productState } = this.state;
    const { location } = this.props;
    const { addToCart } = location.state.product;
    const noRepetElementsAddToCart = [...new Set(addToCart)];

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
              <div data-testid="shopping-cart-product-quantity" key={ product.id }>
                <p data-testid="shopping-cart-product-name">{ product.title }</p>
                <img src={ product.thumbnail } alt="foto" width="100px" />
                <p>{ product.price }</p>
                <p>
                  { this.countRepeatedElements(productState, product) }
                </p>
                <span>
                  <button
                    data-testid="product-increase-quantity"
                    type="button"
                    name={ product.id }
                    onClick={ this.add }
                  >
                    +
                  </button>
                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    name={ product.id }
                    onClick={ this.subtract }

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
