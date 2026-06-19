const url = 'https://api.mercadolibre.com/sites/MLB';

export async function getCategories() {
  const data = await fetch(`${url}/categories`)
    .then((response) => { 
      if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
      }
      return response.json(); 
    })
    .catch((error) => {
      console.log(error);
      return [];
    });

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const data = await fetch(`${url}/search?category=${categoryId}&q=${query}`)
    .then((response) => { 
      if(!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      return [];
    });

  return data;
}
