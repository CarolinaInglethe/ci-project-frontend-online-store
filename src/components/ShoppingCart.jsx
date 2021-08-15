import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    const { location: { state: { product: { addToCart } } } } = this.props;

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

        <header>
          <Link
            to={ {
              pathname: '/',
              state: {
                product: addToCart,
              },
            } }
            className="link-voltar"
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
            className="link-buy"
          >
            Comprar
          </Link>
        </header>

        {
          noRepetElementsAddToCart && noRepetElementsAddToCart.length > 0
            ? noRepetElementsAddToCart.map((product) => (
              <div
                data-testid="shopping-cart-product-quantity"
                key={ product.id }
                className="card-product-cart"
              >
                <p data-testid="shopping-cart-product-name" id="cart-title">
                  { product.title }
                </p>
                <img src={ product.thumbnail } alt="foto" width="100px" />
                <p>{ `R$ ${product.price}` }</p>

                { product.shipping.free_shipping
                  ? <p data-testid="free-shipping" id="shi">°Frete Grátis</p> : null }

                <div className="buttons-add-remove-container">
                  <button
                    data-testid="product-increase-quantity"
                    type="button"
                    name={ product.id }
                    onClick={ this.add }
                    className="button-more-less"
                  >
                    +
                  </button>

                  <p>
                    { this.countRepeatedElements(productState, product) }
                  </p>

                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    name={ product.id }
                    onClick={ this.subtract }
                    className="button-more-less"
                  >
                    -
                  </button>
                </div>
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
    PropTypes.object,
    PropTypes.array,
  ).isRequired,
};

export default ShoppingCart;
