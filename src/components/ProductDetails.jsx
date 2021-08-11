import React from 'react';
import PropTypes from 'prop-types';
// import ShoppingCartIcon from './ShoppingCartIcon';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  render() {
    const { location } = this.props;
    const { state } = location;
    const { product } = state.product;
    console.log(product);
    return (
      <div data-testid="product-detail-name">
        <Link
          to={ {
            pathname: '/shopping-cart',
            state: {
              product: [product],
            },
          } }
          className="link"
          data-testid="shopping-cart-button"
        >
          <FaShoppingCart size="2vw" />
        </Link>
        <p>{ product.title }</p>
        <img src={ product.thumbnail } alt="foto" width="100px" />
        <p>{ product.price }</p>
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
