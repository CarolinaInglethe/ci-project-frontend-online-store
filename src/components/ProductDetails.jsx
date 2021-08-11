import React from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends React.Component {
  render() {
    const { location } = this.props;
    const { state } = location;
    const { product } = state.product;
    console.log(product);
    return (
      <div data-testid="product-detail-name">
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
