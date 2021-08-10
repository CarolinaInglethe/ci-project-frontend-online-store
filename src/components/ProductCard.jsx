import React from 'react';
import propTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div data-testid="product">
        <p>{ product }</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: propTypes.objectOf(
    propTypes.string,
  ).isRequired,
};

export default ProductCard;
