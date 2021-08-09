const url = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const data = await fetch(`${url}/categories`)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const data = await fetch(`${url}/serach?category=${categoryId}&q=${query}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data;
}
