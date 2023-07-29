import React, { useContext, useEffect, useState } from 'react'
import { Stepper } from 'react-form-stepper';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import ShippingDetails from './ShippingComponents/ShippingDetails';
import ProductPayment from './ShippingComponents/ProductPayment';
import Confirmation from './ShippingComponents/Confirmation';
function CustomStepper(props) {
  return (
    <Stepper
      {...props}
      activetitlecolor="#fff"
      completetitlecolor="#eee"
      defaulttitlecolor="#bbb"
      circlefontcolor="#000"
      completebarcolor="#ffbd13" />
  );
}

function Shipping() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { shippingAddress, cartItems }, userInfo } = state;
  const [user, setUser] = useState([]);
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  function getSectionComponent() {
    switch (params.step) {
      case '0': return <ShippingDetails user={user} />;
      case '1': return <ProductPayment />;
      case '2': return <Confirmation items={items} />;
      case '3': return '<ProductPayment />';
      default: return null;
    }
  }

  const steps = [
    { title: 'Shipping details' },
    { title: 'Order Preview' },
    { title: 'Product Payment' },
    // { title: 'Complete payment' },
  ];

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem('userInfo'))
    const Items = JSON.parse(localStorage.getItem('cartItems'))
    const Shipping = JSON.parse(localStorage.getItem('shippingAddress'))

    setUser(User)
    setItems(Items)
    setShipping(Shipping)

    if (!userInfo) {
      navigate('/login?redirect=/shipping/0');
    }
  }, [userInfo, cartItems, shippingAddress, navigate]);

  return (
    <div className="container">
      <CustomStepper
        steps={steps}
        activeStep={params.step} />
      <div style={{ padding: '20px' }}>
        {getSectionComponent()}
      </div>
    </div>
  );
}

export default Shipping
