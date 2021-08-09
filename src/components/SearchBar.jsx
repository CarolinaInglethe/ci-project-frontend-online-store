import React from 'react';
import { getCategories } from '../services/api';

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((result) => this.setState({
        categories: result,
      }));
  }

  render() {
    const { categories } = this.state;

    return (
      <form>
        <label htmlFor="search-input" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input type="text" id="search-input" />
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
