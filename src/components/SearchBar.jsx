import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ShoppingCartIcon from './ShoppingCartIcon';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      inputValue: '',
      listProducts: {},
      selectCategory: '',
      addToCart: [],
    };

    this.getQuery = this.getQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //   getCategories()
  //     .then((result) => this.setState({
  //       categories: result,
  //     }));
  //     console.log(this.props.location.state)
  //   //   const { location: { state: { product } } } = this.prop
  //   //   // const { location } = this.prop
  //   // if ( product ) {
  //   //   this.setState({
  //   //     addToCart: product,
  //   //   });
  //   // }
  // }

  handleClick(event) {
    const { listProducts, addToCart } = this.state;
    const productId = event.target.id;
    const filterProduct = listProducts.filter((result) => result.id === productId);
    const [objectProduct] = filterProduct; // sem filtro: [...addToCart, objectProduct]
    const sumOfArrays = [...addToCart, objectProduct]; // aqui com filtro
    const newArray = [...new Set(sumOfArrays)];
    console.log(newArray);
    this.setState({
      addToCart: [...addToCart, objectProduct], // para ter filtro aqui newArray
    });
    // this.setState({
    //   addToCart: newArray, // para ter filtro aqui newArray
    // });
  }

  handleChange(event) {
    const valueInput = event.target.value;
    this.setState({
      inputValue: valueInput,
    });
  }

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

  getQuery() {
    const { inputValue, selectCategory } = this.state;

    getProductsFromCategoryAndQuery(selectCategory,
      inputValue)
      .then((result) => this.setState({
        listProducts: result.results,
      }));
  }

  render() {
    const { categories, listProducts, addToCart } = this.state;
    // console.log(addToCart)

    return (
      <section>
        <ShoppingCartIcon addToCart={ addToCart } />
        <header>
          <label
            htmlFor="search-input"
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
            <input
              type="text"
              id="search-input"
              data-testid="query-input"
              onChange={ this.handleChange }
            />
            <button type="button" data-testid="query-button" onClick={ this.getQuery }>
              Pesquisar
            </button>
          </label>
        </header>

        <section className="container">
          <div className="categories">
            { categories ? categories.map((category) => (
              <div key={ category.id }>
                <input
                  data-testid="category"
                  name="1"
                  type="radio"
                  value={ category.name }
                  onChange={ this.handleCategory }
                />
                <span>{category.name}</span>
              </div>))
              : null }
          </div>

          <div className="products">
            {
              listProducts.length > 0 ? listProducts.map((product) => (
                <div
                  key={ product.id }
                  className="card-product"
                  data-testid="product"
                >
                  <p>{ product.title }</p>
                  <img src={ product.thumbnail } alt="foto" width="100px" />
                  <p>{ product.price }</p>
                  <Link
                    to={ {
                      pathname: `/product-details/${product.id}`,
                      state: {
                        product: { product },
                      },
                    } }
                    data-testid="product-detail-link"
                  >
                    Detalhes
                  </Link>
                  <button
                    id={ product.id }
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ this.handleClick }
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
