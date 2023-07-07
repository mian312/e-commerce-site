import React, { useEffect, useState } from 'react'
import getProduct from '../../../Data/Product';
import { useNavigate, useParams } from 'react-router-dom'
import ProductImages from './ProductComponent/ProductImages';
import ProductDetails from './ProductComponent/ProductDetails';
import StarRating from '../../StarRating';
import { Helmet } from 'react-helmet-async';
import Loader from '../../Loader';

function Product() {
  const params = useParams();
  const { productId } = params;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  function productPrice(price, discount) {
    let discountAmount = price * (discount / 100);
    let discountedPrice = price - discountAmount;
    let totalPrice = discountedPrice.toFixed(2);
    return totalPrice;
  }


  const options = Array.from({ length: product.stock }, (_, index) => (
    <option key={index} value={index + 1}>
      {index + 1}
    </option>
  ));


  useEffect(() => {
    console.log(productId);
    async function showProduct() {
      try {
        setLoading(true);
        const fetchedProduct = await getProduct(productId);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    showProduct();
  }, [productId, setProduct]);



  return (
    <>
      {!loading ?
        <div className='mx-4 '>
          <div className='m-2'>
            <Helmet>
              <title>{product.title}</title>
            </Helmet>
            <h3>{product.title}</h3>
          </div>
          <div className='bg-transparent rounded container' >
            <ProductImages Images={product.images} />
          </div>
          <div className='d-flex my-2'>
            <h3 className='text-dark'> {productPrice(product.price, product.discountPercentage)}$ </h3>
            <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
            <h3 className='text-danger'> -{product.discountPercentage}% </h3>
          </div>
          <p>
            Total Price: &nbsp;
            <strike className='text-dark'>{product.price}</strike> $
          </p>

          {
            product.stock === 0
              ? <h3 className='text-danger'>Out of stock</h3>
              : <h3 className='text-success'>In Stock</h3>
          }

          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed bg-secondary-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Product Details
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <h4>#...About This Item</h4>
                  <div>
                    <ProductDetails product={product} />
                  </div>
                  <hr />
                  <h4>#...Description</h4>
                  <div>{product.description}</div>
                </div>
              </div>
            </div>
          </div>
          <h1 className='d-flex'>
            <StarRating value={product.rating} editable={false} />
          </h1>

          <div className="d-grid gap-2 col-6 mx-auto mt-4">
            {product.stock !== 0
              ? <button className="btn btn-warning rounded-pill" type="button">Buy Now</button>
              : <div></div>
            }
            <button className="btn btn-danger rounded-pill" type="button">Add to Cart</button>
          </div>

        </div>
        : <h1 className='d-flex align-items-center  justify-content-center' style={{ height: '80vh' }}><Loader /></h1>
      }
    </>
  )
}

export default Product
