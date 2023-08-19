import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { Store } from '../../../Store';
import { Helmet } from 'react-helmet-async';

function ProductPayment() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setpaymentMethodName] = useState(
    paymentMethod || 'paypal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping/0');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/shipping/2');
  };

  return (
    <div style={{ padding: 50 }}>
      <Helmet><title> Order Payment </title></Helmet>
      <form className='card' onSubmit={submitHandler}>
        <fieldset>
          <legend className='card-header text-center'>Select Payment Methode</legend>

          <div className='card-body'>
            <input className='m-2 form-check-input'
              type="radio"
              id='paypal'
              name="pay"
              value="paypal"
              onChange={(e) => setpaymentMethodName(e.target.value)}
              checked={paymentMethodName === 'paypal'} />
            <label htmlFor="paypal" className='card-title'><h5>Paypal</h5></label>
            <p className="card-text mx-5 my-0">Use Paypal to pay the product price</p><br />

            <input className='m-2 form-check-input'
              type="radio"
              id='stripe'
              name="pay"
              value="stripe"
              onChange={(e) => setpaymentMethodName(e.target.value)}
              checked={paymentMethodName === 'stripe'} />
            <label htmlFor="stripe" className='card-title'><h5>Stripe</h5></label>
            <p className="card-text mx-5 my-0">Use Credit Card to pay the product price</p><br />

            <input className='m-2 form-check-input'
              type="radio"
              id='cash'
              name="pay"
              value="cash"
              onChange={(e) => setpaymentMethodName(e.target.value)}
              checked={paymentMethodName === 'cash'} />
            <label htmlFor="cash" className='card-title'><h5>Pay on Delivery</h5></label>
            <p className="card-text mx-5 my-0">Pay for the product on arrival to you</p><br />
          </div>
        </fieldset>

        <button type='submit' className='btn btn-primary'>Continue</button>
      </form>
    </div>
  );
}

export default ProductPayment
