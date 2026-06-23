const categories = require("../__mocks__/categories");
const productsMock = require("../__mocks__/query");
const url = 'https://api.mercadolibre.com/sites/MLB';


export async function getCategories() {
  const data = await fetch(`${url}/categories`)
    .then((response) => { 
      if (!response.ok) throw new Error("API falhou, usando mock");
      return response.json(); 
    })
    .catch((error) => {
      console.log("Erro de rede , usando mock", error);
      return categories;
    });

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const data = await fetch(`${url}/search?category=${categoryId}&q=${query}`)
    .then((response) => { 
      if(!response.ok) throw new Error("API falhou , usando mock");
      return response.json();
    })
    .then((data) => data.results)
    .catch((error) => {
      console.log("Erro de rede , usando mock", error);
      return productsMock.results.filter((item) => {
        const matchCategory = categoryId ? item.category_id === categoryId : true;
        const matchQuery = query ? item.title.toLowerCase().includes(query.toLowerCase()) : true;
        return matchCategory && matchQuery;
      });
    });

  return data;
}
