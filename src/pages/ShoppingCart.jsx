import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    console.log(this.props.location.state);
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }
}

export default ShoppingCart;
