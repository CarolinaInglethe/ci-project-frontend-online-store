import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      inputValue: '',
      listProducts: {},
      selectCategory: '',
    };

    this.getQuery = this.getQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  componentDidMount() {
    getCategories()
      .then((result) => this.setState({
        categories: result,
      }));
  }

  handleChange(event) {
    const valueInput = event.target.value;
    this.setState({
      inputValue: valueInput,
    });
  }

  handleCategory(event) {
    this.setState({
      selectCategory: event.target.value,
    });
  }

  getQuery() {
    const { inputValue, selectCategory } = this.state;
    const productsList = getProductsFromCategoryAndQuery(selectCategory,
      inputValue)
      .then((result) => this.setState({
        listProducts: result.results,
      }));
    console.log(productsList);
  }

  render() {
    const { categories, listProducts } = this.state;
    console.log(listProducts);
    return (
      <section>
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
                  name="1"
                  type="radio"
                  value={ category.name }
                  onChange={ this.handleCategory }
                />
                <span data-testid="category">{category.name}</span>
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
