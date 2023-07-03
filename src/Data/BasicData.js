async function BasicData() {
  try {
    const url = 'https://dummyjson.com/products?limit=45';

    const response = await fetch(url);
    const data = await response.json();
    const products = await data.products;

    // Group products by category
    const productsByCategory = {};
    products.forEach(product => {
      const category = product.category;
      if (!productsByCategory[category]) {
        productsByCategory[category] = product;
      }
    });

    // Extract one product from each category
    const getProducts = Object.values(productsByCategory);
    return getProducts;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



export default BasicData;
