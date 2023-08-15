import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../../utils';
import axios from 'axios';
import { Store } from '../../../Store';
import Loader from '../../Loader';

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };

        default:
            return state;
    }
}

function Confirmation({ items }) {
    const navigate = useNavigate();
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo, now } = state;
    const [tax, setTax] = useState(0);

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });
            const { data } = await axios.post(
                'http://localhost:5000/order',
                localStorage.getItem('buyNow')
                    ? {
                        orderItems: now.items,
                        shippingAddress: now.shippingAddress,
                        paymentMethod: now.paymentMethod,
                        itemsPrice: now.items[0].price,
                        taxPrice: now.taxPrice || 0,
                        totalPrice: now.items[0].price*now.items[0].quantity,
                    }
                    : {
                        orderItems: cart.cartItems,
                        shippingAddress: cart.shippingAddress,
                        paymentMethod: cart.paymentMethod,
                        itemsPrice: cart.itemsPrice,
                        taxPrice: cart.taxPrice,
                        totalPrice: cart.totalPrice,
                    },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' })
            localStorage.getItem('buyNow')
                ? localStorage.removeItem('buyNow')
                : localStorage.removeItem('cartItems')
            navigate(`/order/${data.order._id}`)
        } catch (error) {
            dispatch({ type: 'CREATE_FAIL' })
            toast.error(getError(error))
        }
        // navigate('/order/1');
    }

    useEffect(() => {
        localStorage.getItem('buyNow')
            ? setTax(0)
            : setTax(cart.taxPrice)
        if (!cart.paymentMethod) {
            navigate('/shipping/1')
        }
        console.log("now\n", now)
        console.log("cart\n", cart)
    })
    return (
        <div className="container">
            <Helmet><title> Order Preview </title></Helmet>
            <div className="row">
                <div className="">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th >Product</th>
                                <th className="text-center">Price</th>
                                <th className='text-center'>Quantity</th>
                                <th className="text-center">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {

                                return <tr>
                                    <td className="col-md-9">
                                        <img src={item?.thumbnail} className="img-thumbnail"
                                            style={{ height: '10vh', width: '10vh' }} alt={item?.title} />
                                        <em className='col-md-1 text-center'> &nbsp;&nbsp;{item?.title}</em>
                                    </td>
                                    <td className="col-md-1 text-center">{item?.price}</td>
                                    <td className="col-md-1 text-center">{item?.quantity}</td>
                                    <td className="col-md-1 text-center">{item?.quantity * item?.price}</td>
                                </tr>
                            })}
                            <tr>
                                <td>   </td>
                                <td>   </td>
                                <td className="text-right">
                                    <p>
                                        <strong>Subtotal: </strong>
                                    </p>
                                    <p>
                                        <strong>Tax: </strong>
                                    </p>
                                </td>
                                <td className="text-center">
                                    <p>
                                        <strong>$ {items.reduce((a, c) => a + c.price * c.quantity, 0)}</strong>
                                    </p>
                                    <p>
                                        <strong>$ {tax}</strong>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>  </td>
                                <td>  </td>
                                <td className="text-right">
                                    <h4>
                                        <strong>Total: </strong>
                                    </h4>
                                </td>
                                <td className="text-center text-danger">
                                    <h4>
                                        <strong>$ {items.reduce((a, c) => a + c.price * c.quantity, 0) + tax}</strong>
                                    </h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success btn-lg btn-block float-end" onClick={placeOrderHandler}>
                        Place Order <span className="glyphicon glyphicon-chevron-right">{loading && <Loader />}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
