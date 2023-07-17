import React, { useContext, useEffect, useState } from 'react'
import { Stepper } from 'react-form-stepper';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import ShippingDetails from './ShippingComponents/ShippingDetails';
import { Helmet } from 'react-helmet-async';
function CustomStepper(props) {
  return (
    <Stepper
      {...props}
      // activeColor="#ffd813"
      // defaultColor="#eee"
      // completeColor="#ffbd13"
      activetitlecolor="#fff"
      completetitlecolor="#eee"
      defaulttitlecolor="#bbb"
      circlefontcolor="#000"
      completebarcolor="#ffbd13" />
  );
}

function Shipping() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  function getSectionComponent() {
    switch (params.step) {
      case '0': return <ShippingDetails user={user} />;
      case '1': return '<ProductPayment/>';
      case '2': return '<Confirmation/>';
      default: return null;
    }
  }

  const steps = [
    { title: 'Shipping details' },
    { title: 'Product Payment' },
    { title: 'Booking confirmation' },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    setUser(user)
    if (!userInfo) {
      navigate('/login?redirect=/shipping/0');
    }
  }, [userInfo, navigate]);

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
