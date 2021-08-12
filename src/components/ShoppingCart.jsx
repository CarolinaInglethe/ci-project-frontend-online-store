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

  countRepeatedElements(array, elementToFilter) {
    return array.reduce((accumulator, checkingElement) => (
      elementToFilter === checkingElement ? accumulator + 1 : accumulator),
    0);
  }

  render() {
    // const { productState } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { addToCart } = state.product;
    const noRepetElementsAddToCart = [...new Set(addToCart)];
    // this.setState({
    //   productState: [...productState, ...addToCart],
    // });

    // console.log(this.doesIthaveObject(noRepetElementsAddToCart));
    console.log(addToCart);
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
