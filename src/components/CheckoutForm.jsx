import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

        <header>
          <Link to="/" className="link-voltar">Voltar</Link>
        </header>

        <div>
          <h3>Revise seus Produtos:</h3>
          {
            noRepetElementsAddToCart.map((product) => (
              <div key={ product.id } className="card-product-cart">
                <img src={ product.thumbnail } alt="foto" width="70px" />
                <p>{product.title}</p>
                <p>{ `R$ ${product.price}` }</p>
              </div>
            ))
          }
        </div>

        <p id="total-price">
          {
            `R$ ${this.sumPrices(addToCart)}`
          }
        </p>

        <h3>Informações do Comprador:</h3>

        <form id="form-info">
          <label htmlFor="checkout-fullname" className="labels-checkout">
            Nome completo
            <input type="text" data-testid="checkout-fullname" />
          </label>

          <label htmlFor="checkout-email" className="labels-checkout">
            Email
            <input type="email" data-testid="checkout-email" />
          </label>

          <label htmlFor="checkout-cpf" className="labels-checkout">
            CPF
            <input type="text" data-testid="checkout-cpf" />
          </label>

          <label htmlFor="checkout-phone" className="labels-checkout">
            Telefone
            <input type="text" data-testid="checkout-phone" />
          </label>

          <label htmlFor="checkout-cep" className="labels-checkout">
            CEP
            <input type="text" data-testid="checkout-cep" />
          </label>

          <label htmlFor="checkout-address" className="labels-checkout">
            Endereço
            <input type="text" data-testid="checkout-address" />
          </label>

          <div>
            <button type="submit" id="button-buy">Finalizar</button>
          </div>
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
