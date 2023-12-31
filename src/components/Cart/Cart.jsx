import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Store } from '../../Store';
import CartProduct from './CartComponent/CartProduct';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate()
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const checkOutHandler = () => {
    localStorage.getItem('buyNow') && localStorage.removeItem('buyNow');
    navigate('/login?redirect=/shipping/0');
  }

  return (
    <div>
      <div className=''>
        {cartItems?.length === 0 &&
          <div className='text-center fw-bold text-danger lh-lg'>Add Items to cart</div>}
        {cartItems?.map((item, index) => (
          <CartProduct key={index} item={item} />
        ))}
      </div>
      <hr />
      <div className='sticky-bottom d-flex justify-content-evenly bg-translucent p-2' style={{ zIndex: '999', backgroundColor: 'snow' }}>
        <h3 className='mx-4'>
          Subtotal ({cartItems?.reduce((a, c) => a + c.quantity, 0)} {'  '} items) : $
          {cartItems?.reduce((a, c) => a + c.price * c.quantity, 0)}
        </h3>
        <button
          type="Button"
          className=" btn btn-primary "
          data-bs-dismiss="offcanvas" aria-label="Close"
          disabled={cartItems?.length === 0}
          onClick={checkOutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
