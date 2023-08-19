import React, { useContext, useState } from 'react';
import getProduct from '../../../Data/Product';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Store } from '../../../Store';
import { Link, useNavigate } from 'react-router-dom';

function CartProduct({ item }) {
  const { dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: { ...item, quantity: 1 }
    });
  };

  const updateCartHandler = async (item, quantity) => {
    const { data } = await getProduct(item._id);

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity }
    });
    console.log("Item quantity", item.quantity);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="d-flex align-items-center mb-5">
      <div className="flex-shrink-0">
        <img
          onClick={() => navigate(`/product/${item._id}`)}
          src={item.thumbnail}
          className="img-fluid"
          style={{ width: '20vh' }}
          alt="Generic placeholder image"
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <button className="float-end border border-light-subtle"
          onClick={() => removeItemHandler(item)}
        >
          <i className="bi bi-trash"></i>
        </button>
        <Link className='link-underline-light' to={`/product/${item._id}`}>
          <h5 className="text-primary">{item.title}</h5>
        </Link>
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-5 pe-3">{totalPrice}$</p>
          {item.stock !== 0 ? (
            <div className="d-inline-flex">
              <button onClick={() => updateCartHandler(item, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <div
                className='border border-secondary text-center'
                style={{ width: '10vh' }}
              >
                {item.quantity}
              </div>
              <button onClick={() => updateCartHandler(item, item.quantity + 1)}
                disabled={item.quantity === item.stock}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <p className="d-inine-flex text-danger fw-bold">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
