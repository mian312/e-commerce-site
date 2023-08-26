async function getProduct(productId) {
  try {
    const url = `/api/products/${productId}`

    const response = await fetch(url);
    //console.log(url)


    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error occurred while fetching the product:', error);
    throw error;
  }
}

export default getProduct;
