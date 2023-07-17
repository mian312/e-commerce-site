import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../index.css';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../../Store';

function ShippingDetails({ user }) {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart: {shippingAddress} } =state;
  const [delivery, setDelivery] = useState({
    pin: shippingAddress?.pin || '',
    address: shippingAddress?.address || '',
    phone: shippingAddress?.phone || '',
    landmark: shippingAddress?.landmark || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        pin: delivery.pin,
        address: delivery.address,
        phone: delivery.phone,
        landmark: delivery.landmark,
      },
    });
    
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        pin: delivery.pin,
        address: delivery.address,
        phone: delivery.phone,
        landmark: delivery.landmark,
      })
    );
    
    
    navigate('/shipping/1')
    console.log("delivery",delivery)
    console.log("shipping details",shippingAddress)
  };

  return (
    <div className='container small-container'>
      <Helmet><title> Shipping details </title></Helmet>
      <div className="card container col-md-8 mb-4">
        <div className="card-body">
          <h4 className='text-font mb-3'>Hello! {user?.name}</h4>
          <div className='d-flex'>
            <div className="d-flex mb-3 text-font">Your Email address: &nbsp; &nbsp;
              {user ? (
                <p className='mb-3 text-font text-info'>{user?.email}</p>
              ) : (
                <Link className='text-danger link-underline-light' to={'/login?redirect=/shipping/0'}>Please Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8 mb-4 container">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0 text-font text-uppercase">Shiping Details</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form11Example4">Postal Code</label>
                <input value={delivery.pin} type="text" id="form11Example4" className="form-control"
                  onChange={(e) => setDelivery(prevState => ({ ...prevState, pin: e.target.value }))} />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form11Example5">Delivery Address</label>
                <input value={delivery.address} type="text" id="form11Example5" className="form-control"
                  onChange={(e) => setDelivery(prevState => ({ ...prevState, address: e.target.value }))} />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form11Example6">Phone number</label>
                <input value={delivery.phone} type="number" id="form11Example6" className="form-control"
                  onChange={(e) => setDelivery(prevState => ({ ...prevState, phone: e.target.value }))} />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form11Example7">Landmark near You (optional)</label>
                <input value={delivery.landmark} className="form-control" id="form11Example7" rows="2"
                onChange={(e) => setDelivery(prevState => ({ ...prevState, landmark: e.target.value }))}/>
              </div>

              <button type="submit" className="btn btn-primary float-end" onClick={handleSubmit}>Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingDetails;
