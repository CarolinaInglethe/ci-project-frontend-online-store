import React from 'react';
import PropTypes from 'prop-types';
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import ShoppingCartIcon from './ShoppingCartIcon';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    const { state } = location;
    const { listProducts } = state.listProducts;
    const { addToCart } = state.addToCart;
    console.log(listProducts);

    this.state = {
      addToCart: [...addToCart],
      listProducts,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // const { location } = this.props;
    // const { state } = location;
    // const { addToCart } = state.addToCart;
    const { addToCart: stateAddToCart, listProducts } = this.state;
    const productId = event.target.id;
    const filterProduct = listProducts.filter((result) => result.id === productId);
    const [objectProduct] = filterProduct; // sem filtro: [...addToCart, objectProduct]
    this.setState({
      addToCart: [...stateAddToCart, objectProduct], // para ter filtro aqui newArray
    });
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    const { product } = state.product;
    const { addToCart, listProducts } = this.state;

    console.log(product);
    console.log(listProducts);
    return (
      <div data-testid="product-detail-name">
        <ShoppingCartIcon addToCart={ addToCart } />
        {/* <Link
          to={ {
            pathname: '/shopping-cart',
            state: {
              product: [product],
              addToCart: addToCart,
            },
          } }
          className="link"
          data-testid="shopping-cart-button"
        >
          <FaShoppingCart size="2vw" />
        </Link> */}
        <p>{ product.title }</p>
        <img src={ product.thumbnail } alt="foto" width="100px" />
        <p>{ product.price }</p>
        <button
          id={ product.id }
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao Carrinho
        </button>
        <textarea data-testid="product-detail-evaluation" cols="30" rows="10" />
      </div>
    );
  }
}

// Podia ser assim
// ProductDetails.propTypes = {
//   location: PropTypes.shape({
//     state: PropTypes.shape({
//       product: PropTypes.shape({
//         product: PropTypes.shape({
//           title: PropTypes.string,
//           thumbnail: PropTypes.string,
//           price: PropTypes.number,
//         }),
//       }),
//     }),
//   }).isRequired,
// };

// Mas assim é melhor!
ProductDetails.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ).isRequired,
};

export default ProductDetails;
