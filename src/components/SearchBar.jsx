import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      inputValue: '',
    };

    this.getQuery = this.getQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  getQuery(category) {
    const { inputValue } = this.state;
    return getProductsFromCategoryAndQuery(category,
      inputValue)
      .then((result) => console.log(result)) ? <p>Fooi</p>
      : <p>Nenhum produto foi encontrado</p>;
  }

  render() {
    const { categories } = this.state;

    return (
      <form>
        <label htmlFor="search-input" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input type="text" id="search-input" data-testid="query-input" onChange={ this.handleChange } />
          <button type="button" data-testid="query-button" onClick={ this.getQuery }>
            Pesquisar
          </button>
        </label>

        <div>
          { categories ? categories.map((category) => (
            <div key={ category.id }>
              <input type="radio" value={ category.name } />
              <span data-testid="category">{category.name}</span>
            </div>))
            : null }
        </div>
      </form>
    );
  }
}
export default SearchBar;
