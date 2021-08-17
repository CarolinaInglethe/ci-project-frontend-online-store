import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    const { location: { state: { product: { addToCart } } } } = this.props;

    this.state = {
      productState: [],
      addToCart,
    };

    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
  }

  componentDidMount() {
    this.handleLocalStorage();
  }

  handleLocalStorage() {
    const cart = localStorage.getItem('cart');
    const cartTranslated = JSON.parse(cart);
    let translated;
    if (cartTranslated) {
      const [...getTranslated] = cartTranslated;
      translated = getTranslated;
      this.setState({
        productState: translated,
        addToCart: translated,
      });
    }
  }

  add(event) {
    const { productState } = this.state;
    const precisaSerString = `${event.target.name}`;
    const getOneProduct = productState.find((e) => e.id === precisaSerString);
    productState.push(getOneProduct);

    const jsonAddToCart = JSON.stringify(productState);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', jsonAddToCart);
    const cart = localStorage.getItem('cart');
    const cartTranslated = JSON.parse(cart);

    this.setState({
      productState: cartTranslated,
      addToCart: cartTranslated,
    });
  }

  subtract(event) {
    const { productState } = this.state;
    const precisaSerString = `${event.target.name}`;
    const getOneProduct = productState.find((e) => e.id === precisaSerString);
    const locateElement = productState.indexOf(getOneProduct);
    productState.splice(locateElement, 1);

    const jsonAddToCart = JSON.stringify(productState);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', jsonAddToCart);
    const cart = localStorage.getItem('cart');
    const cartTranslated = JSON.parse(cart);
    console.log(cartTranslated);

    this.setState({
      productState: cartTranslated,
      addToCart: cartTranslated,
    });
  }

  countRepeatedElements(array, elementToFilter) {
    const arrayFiltered = array.filter((e) => e.id === elementToFilter.id);
    return arrayFiltered.length;
  }
  // ANTIGA FORMA:
  // countRepeatedElements(array, elementToFilter) {
  // return array.reduce((accumulator, checkingElement) => (
  //   elementToFilter === checkingElement ? accumulator + 1 : accumulator),
  // 0);
  // }

  render() {
    const { addToCart } = this.state;

    // FORMA ANTIGA DE NÃO REPETIR OS PRODUTOS NO CARRINHO.
    // const noRepetElementsAddToCart = [...new Set(addToCart)];
    const getById = addToCart.map((e) => e.id); // nova forma.
    const noRepetGetById = [...new Set(getById)];
    const noRepetElementsAddToCart = noRepetGetById.reduce((accumulate, id) => {
      const inArray = addToCart.find((e) => e.id === id);
      accumulate.push(inArray);
      return accumulate;
    }, []);
    noRepetElementsAddToCart.sort();

    console.clear();
    console.log('ShoppingCart addToCart', addToCart);

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
                <p data-testid="shopping-cart-product-name" className="cart-title">
                  { product.title }
                </p>
                <img src={ product.thumbnail } alt="foto" width="100px" />
                <p>{ `R$ ${product.price}` }</p>

                { product.shipping.free_shipping
                  ? <p data-testid="free-shipping" className="shi">°Frete Grátis</p>
                  : null }

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
                    { this.countRepeatedElements(addToCart, product) }
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
