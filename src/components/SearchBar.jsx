import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard'

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
      .then((result) => result);

    this.setState({
      listProducts: productsList,
    });
  }

  render() {
    const { categories, listProducts } = this.state;
    console.log(listProducts);
    return (
      <form>
        <label htmlFor="search-input" data-testid="home-initial-message">
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

        <div>
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

        {
        /*
        <div>
          {
            listProducts ? listProducts.map((product) => (
              <ProductCard key={product.} product={ product } />
            )) : <p>Nenhum produto foi encontrado</p>
          }
         </div>
         */
        }
      </form>
    );
  }
}
export default SearchBar;
