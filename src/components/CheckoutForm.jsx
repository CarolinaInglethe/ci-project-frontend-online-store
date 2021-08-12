import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.sumPrices = this.sumPrices.bind(this);
  }

  sumPrices(addToCart) {
    return addToCart.reduce((result, product) => {
      const sum = result + product.price;
      return sum;
    }, 0);
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    const { products } = state;
    const { products2 } = state;
    const { noRepetElementsAddToCart } = products;
    const { addToCart } = products2;
    return (
      <div>
        {
          noRepetElementsAddToCart.map((product) => (
            <div key={ product.id }>
              <p>{ product.title }</p>
              <img src={ product.thumbnail } alt="foto" width="100px" />
              <p>{ product.price }</p>
            </div>
          ))
        }
        <p>
          {
            this.sumPrices(addToCart)
          }
        </p>

        <form>
          <label htmlFor="checkout-fullname">
            Nome completo
            <input type="text" data-testid="checkout-fullname" />
          </label>

          <label htmlFor="checkout-email">
            Email
            <input type="email" data-testid="checkout-email" />
          </label>

          <label htmlFor="checkout-cpf">
            CPF
            <input type="text" data-testid="checkout-cpf" />
          </label>

          <label htmlFor="checkout-phone">
            Telefone
            <input type="text" data-testid="checkout-phone" />
          </label>

          <label htmlFor="checkout-cep">
            CEP
            <input type="text" data-testid="checkout-cep" />
          </label>

          <label htmlFor="checkout-address">
            Endereço
            <input type="text" data-testid="checkout-address" />
          </label>

          <button type="submit">Finalizar</button>
        </form>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ).isRequired,
};

export default CheckoutForm;
