import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  /* constructor(props) {
    super(props);

    this.state = {
      productState: []
    };
  } */

  /* componentDidMount() {
    const { location } = this.props;
    const { state } = location;
    const { addToCart } = state.product;
     this.setState({
        productState:
      });
   } */

  render() {
    const { location } = this.props;
    const { state } = location;
    const { addToCart } = state.product;
    // this.state.productState // []
    console.log(addToCart);
    // <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
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
              <p>{ product.price }</p>
              <p>{ product.price }</p>
              <p data-testid="shopping-cart-product-quantity">1</p>
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
