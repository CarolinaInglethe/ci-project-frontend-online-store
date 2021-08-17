import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    const isLocalStorageOn = localStorage.getItem('cart');
    this.state = {
      categories: [],
      inputValue: '',
      listProducts: {},
      selectCategory: '',
      // addToCart: isLocalStorageOn ? isLocalStorageOn : [],
      addToCart: isLocalStorageOn ? JSON.parse(isLocalStorageOn) : [],
    };

    this.listOfCategories = this.listOfCategories.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // FUNÇAO QUE CHAMA CATEGORIAS DEPOIS DE DOM CARREGADO:
  componentDidMount() {
    getCategories()
      .then((result) => this.setState({
        categories: result,
      }));
  }

  // FUNÇAO ADICIONA PRODUTO E SALVA NO ARRAY DO ESTADO PARA CARRINHO:
  handleClick(event) {
    const { listProducts, addToCart } = this.state;
    const productId = event.target.id;
    const filterProduct = listProducts.filter((result) => result.id === productId);
    const [objectProduct] = filterProduct;
    this.setState({
      addToCart: [...addToCart, objectProduct],
    });
    const sumAll = [...addToCart, objectProduct];
    const jsonAddToCart = JSON.stringify(sumAll);
    localStorage.setItem('cart', jsonAddToCart);
  }

  // FUNÇAO QUE GUARDA VALOR DE INPUT TEXTO NO ESTADO QUANDO ESCRITO:
  handleChange(event) {
    const valueInput = event.target.value;
    this.setState({
      inputValue: valueInput,
    });
  }

  // FUNÇAO CHAMADA QUANDO SE ESCOLHE CATEGORIA input radio :
  handleCategory(event) {
    const { inputValue, categories } = this.state;
    const getCategory = event.target.value;
    const filteredCategory = categories
      .filter((e) => e.name === getCategory)[0].id;
    getProductsFromCategoryAndQuery(filteredCategory,
      inputValue)
      .then((result) => {
        this.setState({
          listProducts: result.results,
        });
      });
    this.setState({
      selectCategory: filteredCategory,
    });
  }

  // FUNÇAO CHAMADA PARA API PELO INPUT E CLICA BOTAO PESQUISAR:
  getQuery() {
    const { inputValue, selectCategory } = this.state;

    getProductsFromCategoryAndQuery(selectCategory,
      inputValue)
      .then((result) => this.setState({
        listProducts: result.results,
      }));
  }

  // FUNÇÂO QUE CRIA LISTA DE CATEGORIAS:
  listOfCategories(categories) {
    return categories ? categories.map((category) => (
      <div key={ category.id }>
        <input
          data-testid="category"
          className="categories"
          name="1"
          type="radio"
          value={ category.name }
          onChange={ this.handleCategory }
        />
        <span>{category.name}</span>
      </div>))
      : null;
  }

  render() {
    const { categories, listProducts, addToCart } = this.state;
    const cart = localStorage.getItem('cart');
    const cartTranslated = JSON.parse(cart);
    let translated;
    if (cartTranslated) {
      const [...getTranslated] = cartTranslated;
      translated = getTranslated;
      console.log(translated.length);
    } else {
      translated = [];
      console.log(translated.length);
    }

    return (
      <section>

        <header>
          {/* INPUT PARA PESQUISAR PRODUTOS POR NOME: */}
          <label
            htmlFor="search-input"
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
            <input
              type="text"
              className="search-input"
              data-testid="query-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              className="search-button"
              data-testid="query-button"
              onClick={ this.getQuery }
            >
              Pesquisar
            </button>
          </label>

          {/* LINK PARA CARRINHO DE COMPRAS : */}
          <Link
            to={ {
              pathname: '/shopping-cart',
              state: {
                product: { addToCart },
              },
            } }
            className="link"
            data-testid="shopping-cart-button"
          >
            <div
              data-testid="shopping-cart-size"
            >
              <FaShoppingCart className="link-cart" />
              { translated.length }
            </div>
          </Link>

        </header>

        <section className="container">

          {/* CHAMA FUNÇÂO QUE CRIA LISTA DE CATEGORIAS DE INPUTS RADIOS : */}
          <div className="categories-list">
            { this.listOfCategories(categories) }
          </div>

          {/* LISTA DE PRODUTOS REQUISITADOS À API POR CATEGORIA OU NOME : */}
          <div className="products-list">
            {
              listProducts.length > 0 ? listProducts.map((product) => (
                <div
                  key={ product.id }
                  className="card-product"
                  data-testid="product"
                >
                  <p>{ product.title }</p>
                  <img src={ product.thumbnail } alt="foto" width="100px" />
                  <p>{ `R$ ${product.price}` }</p>

                  { product.shipping.free_shipping
                    ? <p data-testid="free-shipping" className="shi">°Frete Grátis </p>
                    : null }

                  {/* LINK PARA DETALHES DO PRODUTO ATUAL : */}
                  <Link
                    to={ {
                      pathname: `/product-details/${product.id}`,
                      state: {
                        product: { product },
                        addToCart: { addToCart },
                        listProducts: { listProducts },
                      },
                    } }
                    data-testid="product-detail-link"
                    className="link-details"
                  >
                    Detalhes
                  </Link>

                  {/* BOTAO DE ADICIONAR PRODUTO ATUAL AO CARRINHO: */}
                  <button
                    id={ product.id }
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ this.handleClick }
                    className="button-addCart"
                  >
                    Adicionar ao Carrinho
                  </button>

                </div>
              )) : <p>Nenhum produto foi encontrado</p>
            }
          </div>
        </section>
      </section>
    );
  }
}

export default SearchBar;
