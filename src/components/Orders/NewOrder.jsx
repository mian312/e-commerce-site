import React, { useContext, useEffect, useReducer } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from '../Loader'
import { Store } from '../../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

function NewOrder() {
    const { state } = useContext(Store);
    const { userInfo } = state;

    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`http://localhost:5000/api/order/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        }

        if (!userInfo) {
            return navigate('/login');
        }
        if (
            !order._id || (order._id && order._id !== orderId)
        ) {
            fetchOrder()
        }

    }, [order, userInfo, orderId, navigate])
    console.log(order.orderItems)

    return loading ? (
        <div className="col-md-12 text-center">
            <Loader />
        </div>
    ) : error ? (
        <div className="col-md-12 text-center">
            <div class="mb-4 lead">{error}</div>
        </div>
    ) : (
        <div>
            <Helmet><title>Order {orderId}</title></Helmet>
            <div class="card w-75 mb-3 m-2 mx-auto">
                <div class="card-body">
                    <h5 class="card-title"><strong> Payment Method </strong></h5>
                    <p class="card-text"> {order.paymentMethod}</p>
                    {!order.isPaid ? (
                        <div class="alert alert-warning d-flex align-items-center" role="alert">
                            Payment is not Complete
                        </div>
                    ) : (
                        <div class="alert alert-success d-flex align-items-center" role="alert">
                            Payment Completed
                        </div>
                    )}
                </div>
                <div class="card w-75 mb-3 mx-auto">
                    <div class="card-body">
                        <h5 class="card-title">Items</h5>
                        <tr className='fw-bold'>
                            <td className="col-md-9">
                                <em className='col-md-1 text-center'> &nbsp;&nbsp;Item name</em>
                            </td>
                            <td className="col-md-1 text-center">Price</td>
                            <td className="col-md-1 text-center">Quantity</td>
                            <td className="col-md-1 text-center">Price</td>
                            <hr />
                        </tr>

                        {order.orderItems.map((item) => {
                            return <tr>
                                <td className="col-md-9">
                                    <em className='col-md-1 text-center'> &nbsp;&nbsp;{item?.title}</em>
                                </td>
                                <td className="col-md-1 text-center">{item?.price}</td>
                                <td className="col-md-1 text-center">{item?.quantity}</td>
                                <td className="col-md-1 text-center">{item?.quantity * item.price}</td>
                            </tr>
                        })}
                    </div>
                </div>
                <ul class="list-group mb-3">
                    <h3 className='text-center'>Order Details</h3>
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 class="my-0">Order Total</h6>
                        </div>
                        <span class="text-body-secondary">${order.itemsPrice.toFixed(2)}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 class="my-0">Tax</h6>
                        </div>
                        <span class="text-body-secondary">${order.taxPrice.toFixed(2)}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default NewOrder
