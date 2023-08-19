import React, { useContext, useEffect, useReducer, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/order/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  console.log(orders)
  return (
    <div className='table-wrap'>
      <Helmet><title>Order History</title></Helmet>
      <table className='table table-responsive table-boderless text-uppercase'>
        <thead>
          <th className='text-center'>Order Id</th>
          <th className='text-center'>Date</th>
          <th className='text-center'>Total</th>
          <th className='text-center'>Paid</th>
          <th className='text-center'>Delivered</th>
        </thead>
        <hr />
        <tbody>
          {
            orders?.map((order) => (
              <tr key={order._id} onClick={() => navigate(`/order/${order._id}`)}>
                <td className='text-center'>{order._id}</td>
                <td className='text-center'>{order.updatedAt.substring(0, 10)}</td>
                <td className='text-center'>{order.totalPrice}</td>
                <td className='text-center'>{order.isPaid ? order.paymentMethod : "No"}</td>
                <td className='text-center'>{order.isDelivered ? "Yes" : "No"}</td>
              </tr>
            ))
          }
        </tbody>

      </table>
    </div>
  )
}

export default OrderHistory
