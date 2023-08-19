async function BasicData() {
  try {
    const url = 'http://localhost:5000/api/products';

    const response = await fetch(url);
    // const data = await response.json();
    // const products = await data.products;
    const products = await response.json();

    // Group products by category
    const productsByCategory = {};
    products.slice(0, 45).forEach(product => {
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
