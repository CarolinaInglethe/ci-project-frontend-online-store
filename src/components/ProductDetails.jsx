import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { state } = location;
    const { listProducts } = state.listProducts;
    const { product } = state.product;
    const { addToCart } = state.addToCart;
    const storaRating = localStorage.getItem(`${product.id}`);
    const translatedRating = JSON.parse(storaRating);

    this.state = {
      addToCart: [...addToCart],
      listProducts,
      rating: translatedRating,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRating = this.handleRating.bind(this);
  }

  handleClick(event) {
    const { addToCart: stateAddToCart, listProducts } = this.state;
    const productId = event.target.id;
    const filterProduct = listProducts.filter((result) => result.id === productId);
    const [objectProduct] = filterProduct; // sem filtro: [...addToCart, objectProduct]

    const sumAll = [...stateAddToCart, objectProduct];
    const jsonAddToCart = JSON.stringify(sumAll);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', jsonAddToCart);
    const cart = localStorage.getItem('cart');
    const cartTranslated = JSON.parse(cart);

    this.setState({
      addToCart: cartTranslated, // para ter filtro aqui newArray
    });
  }

  handleRating(event) {
    const { location } = this.props;
    const { state } = location;
    const { product } = state.product;
    localStorage.removeItem(`${product.id}`);
    const rating = JSON.stringify(event.target.value);
    localStorage.setItem(`${product.id}`, rating);
    // Esse setState é usado para forçar a página a atualizar.
    this.setState({
      rating: event.target.value,
    });
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    const { product } = state.product;
    const { addToCart, rating } = this.state;
    // const getRating = localStorage.getItem(`${product.id}`);
    // const getRatingTranslated = JSON.parse(getRating);

    console.clear();
    console.log(addToCart);
    console.log(`Storage do ${product.id}`, localStorage[`${product.id}`]);
    console.log('Storage:', localStorage);

    return (
      <div data-testid="product-detail-name">

        <header>
          <Link to="/" className="link-voltar"> Voltar </Link>

          <Link
            to={ {
              pathname: '/shopping-cart',
              state: {
                product: { addToCart },
              },
            } }
            className="link-cart"
            data-testid="shopping-cart-button"
          >
            <div
              data-testid="shopping-cart-size"
            >
              <FaShoppingCart className="link-cart" />
              { addToCart.length }
            </div>
          </Link>
        </header>

        <div className="card-product-detail">
          <p>{ product.title }</p>
          <img
            className="image-details"
            src={ product.thumbnail }
            alt="foto"
            width="160px"
          />
          <p>{ `R$ ${product.price}` }</p>

          { product.shipping.free_shipping
            ? <p data-testid="free-shipping">°Frete Grátis</p> : null }

          <button
            id={ product.id }
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.handleClick }
            className="button-addCart"
          >
            Adicionar ao Carrinho
          </button>

          <label htmlFor="textarea" className="text-area-coment">
            Escreva algum comentário :
            <textarea
              name="textarea"
              id="textarea"
              data-testid="product-detail-evaluation"
              cols="30"
              rows="10"
              value={ rating }
              onChange={ this.handleRating }
            />
          </label>

        </div>

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
