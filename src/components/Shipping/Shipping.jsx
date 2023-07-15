import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';

function Shipping() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();


  return (
    <div>
      
    </div>
  )
}

export default Shipping
