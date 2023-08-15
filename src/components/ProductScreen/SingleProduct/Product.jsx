import React, { useContext, useEffect, useState } from 'react'
import getProduct from '../../../Data/Product';
import { useNavigate, useParams } from 'react-router-dom'
import ProductImages from './ProductComponent/ProductImages';
import ProductDetails from './ProductComponent/ProductDetails';
import StarRating from '../../StarRating';
import { Helmet } from 'react-helmet-async';
import Loader from '../../Loader';
import { Store } from '../../../Store';

function Product() {
  const params = useParams();
  const { productId } = params;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1)

  function productPrice(price, discount) {
    let originalPrice = price / (1 - discount / 100);
    let totalPrice = originalPrice.toFixed(2);
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

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await getProduct(product._id)
    // if (data.stock < quantity) {
    //   alert('Product is out of stock');
    //   return;
    // }

    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: productQuantity } })
  }

  const buyNowProduct = () => {
    navigate('/shipping/0')
    localStorage.setItem('buyNow', JSON.stringify([{...product, quantity: productQuantity}]))
  }

  const inc = () => {
    setProductQuantity( e => e+1 )
  }
  const dec = () => {
    setProductQuantity( e => e-1 )
  }

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
            <h3 className='text-dark'> {product.price}$ </h3>
            <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
            <h3 className='text-danger'> -{product.discountPercentage}% </h3>
          </div>
          <p>
            Total Price: &nbsp;
            <strike className='text-dark'>{productPrice(product.price, product.discountPercentage)}</strike> $
          </p>

          {product.stock !== 0 ? (
            <div className="d-inline-flex">
              <button onClick={ dec }
                disabled={productQuantity === 1}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <div
                className='border border-secondary text-center'
                style={{ width: '10vh' }}
              >
                {productQuantity}
              </div>
              <button onClick={inc}
                disabled={productQuantity === product.stock}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <p className="d-inine-flex text-danger fw-bold">Out of Stock</p>
          )}

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
              ? <button onClick={buyNowProduct} className="btn btn-warning rounded-pill" type="button">Buy Now</button>
              : <button className="btn btn-warning rounded-pill" type="button" disabled>Product Out of Stock</button>
            }
            <button onClick={addToCartHandler} className="btn btn-danger rounded-pill" type="button">Add to Cart</button>
          </div>

        </div>
        : <h1 className='d-flex align-items-center  justify-content-center' style={{ height: '80vh' }}><Loader /></h1>
      }
    </>
  )
}

export default Product
